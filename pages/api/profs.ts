import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './db/db';

export default async function profHandler(req: NextApiRequest, res: NextApiResponse) {
    
    interface Prof {
        email: string,
        fname: string,
        lname: string,
        faculty: string,
        tenured: boolean,
    }
    
    const { method } = req

    switch (method) {
        case 'GET':
            // Get all profs
            try {
                const profs = await prisma.prof.findMany({
                    where: { },
                    orderBy: { p_id: "desc" }
                })
                res.status(200).json({ profs });
        
            } catch (err: any) {
                res.status(400).json({ error: err.message});
            }
            break
        
        case 'POST':
            // Create prof
            try {
                const { email, fname, lname, faculty, tenured }: Prof = req.body;
                
                const prof = await prisma.prof.upsert({
                    where: { email, },
                    update: {},
                    create: {
                        email,
                        fname,
                        lname,
                        faculty,
                        tenured,
                    }
                })
                res.json({ prof })
        
            } catch (err: any) {
                res.status(400).json({ error: err.message });
            }
            break

            
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}