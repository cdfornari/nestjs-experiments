BEGIN;
INSERT INTO users (id, email, enterprise) VALUES (gen_random_uuid(),'jhondoe@google.com','google');
INSERT INTO users (id, email, enterprise) VALUES (gen_random_uuid(),'janedoe@apple.com','apple');
INSERT INTO users (id, email) VALUES (gen_random_uuid(),'bozniak@email.com');
COMMIT;