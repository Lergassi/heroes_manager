# Показывает пользователей и игроков.
select u.email, p.name, u.id, p.id from players p join users u on u.id = p.user_id order by p.created_at;