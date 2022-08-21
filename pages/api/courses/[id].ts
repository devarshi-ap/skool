import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function courseHandler(req: NextApiRequest, res: NextApiResponse) {
    
    const { method, query } = req
    const { id } = query;

    switch (method) {
        case 'GET':
            // Get course with c_id
            try {
                const course = await prisma.course.findUnique({
                    where: { c_id: Number(id), }
                })

                if (!course) {
                    res.status(404).json({ message: `Course with id: ${id} not found.` });
                } else {
                    res.status(200).json({ course });
                }
                
            } catch (err: any) {
                res.status(400).json({ message: err.message });
            }
            break
        
        case 'DELETE':
            // Delete course with c_id
            try {
                // ... from Course table
                const course = await prisma.course.delete({
                    where: { c_id: Number(id), }
                })

                // ... from Stu_Cou table
                await prisma.stu_cou.deleteMany({
                    where: { course_id: Number(id), }
                })

                res.status(200).json({ course });

            } catch (err: any) {
                res.status(400).json({ error: err.message });
            }
            break

        default:
            res.setHeader('Allow', ['GET', 'DELETE'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}