import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function courseHandler(req: NextApiRequest, res: NextApiResponse) {
    
    interface Course {
       dept: string,
       code: string,
       title: string,
       description: string,
       prof: string,
       units: number,
       semester: string,
    }
    
    const { method } = req

    switch (method) {
        case 'GET':
            // Get all courses
            try {
                const courses = await prisma.course.findMany({
                    where: { },
                    orderBy: { c_id: "desc" }
                })
                res.status(200).json({ courses });
        
            } catch (err: any) {
                res.status(400).json({ error: err.message});
            }
            break
        
        case 'POST':
            // Create course
            try {
                const { dept, code, title, description, prof, units, semester }: Course = req.body;
                
                const course = await prisma.course.upsert({
                    where: { code, },
                    update: {},
                    create: {
                        dept,
                        code,
                        title,
                        description,
                        prof,
                        units,
                        semester,
                    }
                })
                res.status(200).json({ course })
        
            } catch (err: any) {
                res.status(400).json({ error: err.message });
            }
            break

            
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}