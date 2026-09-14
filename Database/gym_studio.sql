-- Gym Studio database
-- PostgreSQL (Neon)

CREATE TABLE branches (
  branch_code   INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  branch_name   VARCHAR(100) NOT NULL
);

CREATE TABLE classes (
  class_code       INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  branch_code      INT NOT NULL REFERENCES branches(branch_code),
  class_name       VARCHAR(100) NOT NULL,
  start_time       TIMESTAMP NOT NULL,
  end_time         TIMESTAMP NOT NULL,
  instructor_name  VARCHAR(100) NOT NULL,
  max_participants INT NOT NULL CHECK (max_participants > 0)
);

INSERT INTO branches (branch_name) VALUES
  ('Tel Aviv'), ('Haifa'), ('Jerusalem');

INSERT INTO classes (branch_code, class_name, start_time, end_time, instructor_name, max_participants) VALUES
  (1, 'Yoga',     '2026-09-10 09:00', '2026-09-10 10:00', 'Maya Levi',    20),
  (1, 'Pilates',  '2026-09-20 18:00', '2026-09-20 19:15', 'Noa Cohen',    15),
  (1, 'Spinning', '2026-09-25 07:30', '2026-09-25 08:30', 'Eitan Bar',    25),
  (2, 'Yoga',     '2026-09-12 17:00', '2026-09-12 18:00', 'Dana Shapira', 18),
  (2, 'Zumba',    '2026-09-22 20:00', '2026-09-22 21:00', 'Lior Mizrahi', 30),
  (3, 'Pilates',  '2026-09-08 08:00', '2026-09-08 09:00', 'Tal Avrahami', 12),
  (3, 'Spinning', '2026-09-30 19:00', '2026-09-30 20:00', 'Roni Katz',    22);