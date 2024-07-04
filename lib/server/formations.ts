import 'server-only';

import { turso } from '@/lib/turso';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function getFormation(id: string) {
    const { userId } = auth();
    let formation;
  
    if (userId) {
      formation = await turso.execute({
        sql: `
        SELECT
            f.*,
            v.id AS currentUserLiked
        FROM
            formations f
        LEFT JOIN
            votes v
        ON
            f.id = v.formation_id
        AND
            v.user_id = (:userId)
        WHERE f.id = (:id);
      `,
        args: { id, userId },
      });
    } else {
      formation = await turso.execute({
        sql: "SELECT * FROM formations WHERE id = ?",
        args: [id],
      });
    }

    formation = formation.rows[0];
    
    const user = await clerkClient.users.getUser(formation.user_id?.toString()!);

    formation = {
        ...formation,
        user_id: user.username,
        user_image: user.imageUrl,
    };

    return formation;
}