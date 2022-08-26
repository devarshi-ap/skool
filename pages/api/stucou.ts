import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './db/db';

export default async function stuCouHandler(req: NextApiRequest, res: NextApiResponse) {
    
    const { method } = req

    switch (method) {
        case 'GET':
            // Get all students-course relationships
            try {
                const stuCouData = await prisma.stu_cou.findMany({
                    where: { },
                    orderBy: { student_id: "desc" }
                })
                res.status(200).json({ stuCouData });
        
            } catch (err: any) {
                res.status(400).json({ error: err.message});
            }
            break
            
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}