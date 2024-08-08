-- Custom SQL migration file, put you code below! --
CREATE VIEW IF NOT EXISTS `formationsWithVotes` AS
    SELECT
        f.*,
        COUNT(v.id) AS "voteCount"
    FROM formations f
    LEFT JOIN votes v ON f.id = v.formation_id
    GROUP BY f.id;