import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './db/db';

export default async function studentHandler(req: NextApiRequest, res: NextApiResponse) {
    
    interface Student {
        email: string,
        fname: string,
        lname: string,
        program: string,
        year: number,
        gpa: number,
    }
    
    const { method } = req

    switch (method) {
        case 'GET':
            // Get all students
            try {
                const students = await prisma.student.findMany({
                    where: { },
                    orderBy: { s_id: "desc" }
                })
                res.status(200).json({ students });
        
            } catch (err: any) {
                res.status(400).json({ error: err.message});
            }
            break
        
        case 'POST':
            // Create student
            try {
                const { email, fname, lname, program, year, gpa }: Student = req.body;
                
                const student = await prisma.student.upsert({
                    where: { email, },
                    update: {},
                    create: {
                        email,
                        fname,
                        lname,
                        program,
                        year,
                        gpa,
                    }
                })
                res.json({ student })
        
            } catch (err: any) {
                res.status(400).json({ error: err.message });
            }
            break

            
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}