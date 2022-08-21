import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function studentHandler(req: NextApiRequest, res: NextApiResponse) {
    
    const { method, query } = req
    const { id } = query;

    switch (method) {
        case 'GET':
            // Get student with s_id
            try {
                const student = await prisma.student.findUnique({
                    where: { s_id: Number(id), }
                })

                if (!student) {
                    res.status(404).json({ message: `Student with id: ${id} not found.` });
                } else {
                    res.status(200).json({ student });
                }
        
            } catch (err: any) {
                res.status(400).json({ message: err.message });
            }
            break
        
        case 'DELETE':
            // Delete student with s_id
            try {
                // ... from Student table
                const student = await prisma.student.delete({
                    where: { s_id: Number(id), }
                })

                // ... from Stu_Cou table
                await prisma.stu_cou.deleteMany({
                    where: { student_id: Number(id), }
                })

                res.status(200).json({ student });

            } catch (err: any) {
                res.status(400).json({ error: err.message });
            }
            break
        
        case 'PATCH':
            try {
                // Update student with s_id
                const student = await prisma.student.update({
                    where: { s_id: Number(id), },
                    data: req.body,
                })
                res.status(200).json({ student })

            } catch (err: any) {
                res.status(400).json({ error: err.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'DELETE', 'PATCH'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}