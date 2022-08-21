import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db';

export default async function courseHandler(req: NextApiRequest, res: NextApiResponse) {

    const { query, method } = req
    const { id, courseId } = query;

    switch (method) {
        case 'PUT':
            // PUT (enrol) new course with id of student with id
            try {
                const courses = await prisma.stu_cou.create({
                    data: {
                        student_id: Number(id),
                        course_id: Number(courseId),
                    }
                })
                res.status(200).json({ message: `Successfully enrolled Student (id: ${id}) into Course with id: ${courseId}`, courses });
        
            } catch (err: any) {
                res.status(400).json({ error: err.message});
            }
            break

        case 'DELETE':
            // DELETE (drop) course with id of student with id
            // Neither rows are unique, therefore use a deleteMany > delete and restrict 'where' query to always only have 1 result.
            try {
                const course = await prisma.stu_cou.deleteMany({
                    where: {
                        student_id: Number(id),
                        course_id: Number(courseId),
                    },
                })

                if (!course) {
                    res.status(404).json({ message: `Student (id: ${id}) not enrolled in Course with id: ${courseId}.` });
                } else {
                    res.status(200).json({ message: `Successfully dropped Student (id: ${id}) out of Course (id: ${courseId})`});
                }
        
            } catch (err: any) {
                res.status(400).json({ error: err.message});
            }
            break
            
        default:
            res.setHeader('Allow', ['PUT', 'DELETE'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}