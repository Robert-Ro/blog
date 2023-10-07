# mysql


## 待整理

mysql trigger MySQL Trigger 来在数据插入、更新、删除时自动删除过期数据。这样可以保证数据在过期后立即被删除，而不需要等待定时任务的执行。

```sql
CREATE TRIGGER cleanup_data
ON SCHEDULE EVERY 1 DAY
  BEFORE INSERT ON my_table
  FOR EACH ROW
  BEGIN
    -- 检查记录是否已经过期，如果过期则删除
    DELETE FROM my_table WHERE expiration_date < NOW();
  END;

```

- MySQL 8.0 Reference Manual - Triggers: https://dev.mysql.com/doc/refman/8.0/en/triggers.html
- MySQL 8.0 Reference Manual - Trigger Syntax and Examples: https://dev.mysql.com/doc/refman/8.0/en/trigger-syntax.html