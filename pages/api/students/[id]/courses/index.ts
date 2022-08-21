import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db';

export default async function courseHandler(req: NextApiRequest, res: NextApiResponse) {

    const { query, method } = req
    const { id } = query;

    switch (method) {
        case 'GET':
            // Get all courses of student with id
            try {
                const courses = await prisma.stu_cou.findMany({
                    where: { student_id: Number(id) },
                    orderBy: { course_id: "desc" }
                })
                
                if (!courses || courses.length == 0) {
                    res.status(404).json({ message: `Could not find courses for Student with id: ${id}.` });
                } else {
                    res.status(200).json({ courses });
                }
                
            } catch (err: any) {
                res.status(400).json({ error: err.message});
            }
            break
            
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}