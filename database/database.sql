create database intern;
use intern;


CREATE TABLE College (
    college_id INT PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(255),
    contact VARCHAR(50)
);

CREATE TABLE Mentor (
    mentor_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    dob DATE
);

CREATE TABLE Company (
    company_id INT PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(50),
    location VARCHAR(100),
    contact VARCHAR(50)
);

CREATE TABLE Student (
    student_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    dob DATE,
    college_id INT,
    mentor_id INT,
    FOREIGN KEY (college_id) REFERENCES College(college_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (mentor_id) REFERENCES Mentor(mentor_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE Internship (
    internship_id INT PRIMARY KEY,
    field VARCHAR(100),
    stipend DECIMAL(10,2),
    mode VARCHAR(20),
    start_date DATE,
    end_date DATE,
    company_id INT,
    FOREIGN KEY (company_id) REFERENCES Company(company_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Application (
    application_id INT ,
    status VARCHAR(50),
    student_id INT,
    company_id INT,
    PRIMARY KEY (student_id, company_id, application_id),
    FOREIGN KEY (student_id) REFERENCES Student(student_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (company_id) REFERENCES Company(company_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Certificate (
    certificate_id INT,
    issue_date DATE,
    internship_id INT,
    PRIMARY KEY(certificate_id, internship_id),
    FOREIGN KEY (internship_id) REFERENCES Internship(internship_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Job_Offer (
    offer_id INT PRIMARY KEY,
    role VARCHAR(100),
    package DECIMAL(10,2),
    location VARCHAR(100),
    internship_id INT,
    FOREIGN KEY (internship_id) REFERENCES Internship(internship_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Feedback (
    feedback_id INT,
    comment TEXT,
    mentor_id INT,
    company_id INT,
    PRIMARY KEY(feedback_id, mentor_id, company_id),
    FOREIGN KEY (mentor_id) REFERENCES Mentor(mentor_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (company_id) REFERENCES Company(company_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Goodies (
    goodie_id INT,
    hoodie VARCHAR(50),
    cup VARCHAR(50),
    bottle VARCHAR(50),
    internship_id INT,
    PRIMARY KEY(goodie_id, internship_id),
    FOREIGN KEY (internship_id) REFERENCES Internship(internship_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Company_College (
    company_id INT,
    college_id INT,
    PRIMARY KEY (company_id, college_id),
    FOREIGN KEY (company_id) REFERENCES Company(company_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (college_id) REFERENCES College(college_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Student_Email (
    student_id INT,
    email_id VARCHAR(100),
    PRIMARY KEY (student_id, email_id),
    FOREIGN KEY (student_id) REFERENCES Student(student_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Mentor_Email (
    mentor_id INT,
    email_id VARCHAR(100),
    PRIMARY KEY (mentor_id, email_id),
    FOREIGN KEY (mentor_id) REFERENCES Mentor(mentor_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


INSERT INTO College (college_id, name, address, contact) VALUES
(1, 'IIT Delhi', 'Hauz Khas, New Delhi', '011-2659-1737'),
(2, 'NIT Trichy', 'Tiruchirappalli, Tamil Nadu', '0431-250-3010'),
(3, 'BITS Pilani', 'Pilani, Rajasthan', '01596-245-073');

INSERT INTO Mentor (mentor_id, first_name, last_name, dob) VALUES
(1, 'Rohit', 'Sharma', '1985-04-11'),
(2, 'Priya', 'Mehta', '1990-06-22'),
(3, 'Anil', 'Kumar', '1982-09-05');

INSERT INTO Company (company_id, name, type, location, contact) VALUES
(1, 'Infosys', 'IT Services', 'Bengaluru', '080-2852-0261'),
(2, 'Tata Motors', 'Automotive', 'Pune', '020-6615-7000'),
(3, 'Reliance Industries', 'Energy', 'Mumbai', '022-3555-5000');

INSERT INTO Student (student_id, first_name, last_name, dob, college_id, mentor_id) VALUES
(101, 'Aarav', 'Verma', '2003-07-15', 1, 1),
(102, 'Sneha', 'Rao', '2002-12-03', 2, 2),
(103, 'Karan', 'Singh', '2004-02-20', 3, 3);

INSERT INTO Internship (internship_id, field, stipend, mode, start_date, end_date, company_id) VALUES
(201, 'Web Development', 15000, 'Online', '2025-05-01', '2025-07-31', 1),
(202, 'Mechanical Design', 18000, 'Onsite', '2025-06-15', '2025-09-15', 2),
(203, 'Data Analytics', 20000, 'Hybrid', '2025-05-10', '2025-08-10', 3);

INSERT INTO Application (application_id, status, student_id, company_id) VALUES
(301, 'Pending', 101, 1),
(302, 'Accepted', 102, 2),
(303, 'Rejected', 103, 3);

INSERT INTO Certificate (certificate_id, issue_date, internship_id) VALUES
(401, '2025-08-01', 201),
(402, '2025-09-20', 202),
(403, '2025-08-20', 203);

INSERT INTO Job_Offer (offer_id, role, package, location, internship_id) VALUES
(501, 'Software Engineer', 900000, 'Bengaluru', 201),
(502, 'Design Engineer', 850000, 'Pune', 202),
(503, 'Data Analyst', 950000, 'Mumbai', 203);

INSERT INTO Feedback (feedback_id, comment, mentor_id, company_id) VALUES
(601, 'Excellent guidance and mentorship from company mentors.', 1, 1),
(602, 'Student performance was outstanding in mechanical domain.', 2, 2),
(603, 'Analytical work and communication were very good.', 3, 3);

INSERT INTO Goodies (goodie_id, hoodie, cup, bottle, internship_id) VALUES
(701, 'Yes', 'No', 'Yes', 201),
(702, 'No', 'Yes', 'Yes', 202),
(703, 'Yes', 'Yes', 'No', 203);

INSERT INTO Company_College (company_id, college_id) VALUES
(1, 1),
(2, 2),
(3, 3);

INSERT INTO Student_Email (student_id, email_id) VALUES
(101, 'aarav.verma@iitd.ac.in'),
(101, 'aarav.personal@gmail.com'),
(102, 'sneha.rao@nitt.edu'),
(102, 'sneha.rao.work@gmail.com'),
(103, 'karan.singh@bits-pilani.ac.in'),
(103, 'karan.singh2025@gmail.com');

INSERT INTO Mentor_Email (mentor_id, email_id) VALUES
(1, 'rohit.sharma@iitd.ac.in'),
(1, 'rohit.sharma.research@gmail.com'),
(2, 'priya.mehta@nitt.edu'),
(2, 'priya.mehta.faculty@gmail.com'),
(3, 'anil.kumar@bits-pilani.ac.in'),
(3, 'anil.kumar.lab@gmail.com');

-- 1. Procedure to apply for an internship
DELIMITER //
CREATE PROCEDURE ApplyForInternship(
    IN p_student_id INT,
    IN p_company_id INT,
    OUT p_application_id INT
)
BEGIN
    DECLARE max_app_id INT;
    
    -- Get the next application ID
    SELECT COALESCE(MAX(application_id), 300) + 1 INTO max_app_id FROM Application;
    
    -- Insert new application
    INSERT INTO Application (application_id, status, student_id, company_id)
    VALUES (max_app_id, 'Pending', p_student_id, p_company_id);
    
    SET p_application_id = max_app_id;
END //
DELIMITER ;


-- 2. Procedure to update application status
DELIMITER //
CREATE PROCEDURE UpdateApplicationStatus(
    IN p_application_id INT,
    IN p_new_status VARCHAR(50)
)
BEGIN
    UPDATE Application 
    SET status = p_new_status 
    WHERE application_id = p_application_id;
    
    SELECT CONCAT('Application ', p_application_id, ' status updated to ', p_new_status) AS Message;
END //
DELIMITER ;


-- 3. Procedure to get student complete details
DELIMITER //
CREATE PROCEDURE GetStudentDetails(IN p_student_id INT)
BEGIN
    SELECT 
        s.student_id,
        s.first_name,
        s.last_name,
        s.dob,
        c.name AS college_name,
        CONCAT(m.first_name, ' ', m.last_name) AS mentor_name,
        GROUP_CONCAT(DISTINCT se.email_id SEPARATOR ', ') AS emails
    FROM Student s
    LEFT JOIN College c ON s.college_id = c.college_id
    LEFT JOIN Mentor m ON s.mentor_id = m.mentor_id
    LEFT JOIN Student_Email se ON s.student_id = se.student_id
    WHERE s.student_id = p_student_id
    GROUP BY s.student_id;
END //
DELIMITER ;


-- 4. Procedure to issue certificate for completed internship
DELIMITER //
CREATE PROCEDURE IssueCertificate(
    IN p_internship_id INT,
    OUT p_certificate_id INT
)
BEGIN
    DECLARE max_cert_id INT;
    DECLARE internship_end DATE;
    
    -- Check if internship has ended
    SELECT end_date INTO internship_end 
    FROM Internship 
    WHERE internship_id = p_internship_id;
    
    IF internship_end <= CURDATE() THEN
        -- Get next certificate ID
        SELECT COALESCE(MAX(certificate_id), 400) + 1 INTO max_cert_id FROM Certificate;
        
        -- Insert certificate
        INSERT INTO Certificate (certificate_id, issue_date, internship_id)
        VALUES (max_cert_id, CURDATE(), p_internship_id);
        
        SET p_certificate_id = max_cert_id;
    ELSE
        SET p_certificate_id = NULL;
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Cannot issue certificate for ongoing internship';
    END IF;
END //
DELIMITER ;


-- 5. Procedure to get company statistics
DELIMITER //
CREATE PROCEDURE GetCompanyStatistics(IN p_company_id INT)
BEGIN
    SELECT 
        c.name AS company_name,
        COUNT(DISTINCT i.internship_id) AS total_internships,
        COUNT(DISTINCT a.application_id) AS total_applications,
        SUM(CASE WHEN a.status = 'Accepted' THEN 1 ELSE 0 END) AS accepted_applications,
        SUM(CASE WHEN a.status = 'Pending' THEN 1 ELSE 0 END) AS pending_applications,
        AVG(i.stipend) AS average_stipend
    FROM Company c
    LEFT JOIN Internship i ON c.company_id = i.company_id
    LEFT JOIN Application a ON c.company_id = a.company_id
    WHERE c.company_id = p_company_id
    GROUP BY c.company_id;
END //
DELIMITER ;


-- 6. Procedure to assign mentor to student
DELIMITER //
CREATE PROCEDURE AssignMentor(
    IN p_student_id INT,
    IN p_mentor_id INT
)
BEGIN
    UPDATE Student 
    SET mentor_id = p_mentor_id 
    WHERE student_id = p_student_id;
    
    SELECT CONCAT('Mentor ', p_mentor_id, ' assigned to Student ', p_student_id) AS Message;
END //
DELIMITER ;


-- 7. Procedure to add new internship
DELIMITER //
CREATE PROCEDURE AddInternship(
    IN p_field VARCHAR(100),
    IN p_stipend DECIMAL(10,2),
    IN p_mode VARCHAR(20),
    IN p_start_date DATE,
    IN p_end_date DATE,
    IN p_company_id INT,
    OUT p_internship_id INT
)
BEGIN
    DECLARE max_intern_id INT;
    
    -- Validate dates
    IF p_end_date <= p_start_date THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'End date must be after start date';
    END IF;
    
    -- Get next internship ID
    SELECT COALESCE(MAX(internship_id), 200) + 1 INTO max_intern_id FROM Internship;
    
    -- Insert internship
    INSERT INTO Internship (internship_id, field, stipend, mode, start_date, end_date, company_id)
    VALUES (max_intern_id, p_field, p_stipend, p_mode, p_start_date, p_end_date, p_company_id);
    
    SET p_internship_id = max_intern_id;
END //
DELIMITER ;

-- 8. insert student
DELIMITER //
CREATE PROCEDURE InsertStudent(
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_dob DATE,
    IN p_college_id INT,
    IN p_mentor_id INT,
    OUT p_student_id INT
)
BEGIN
    DECLARE next_id INT;

    -- Age validation
    IF TIMESTAMPDIFF(YEAR, p_dob, CURDATE()) < 16 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Student must be at least 16 years old';
    END IF;

    -- Generate next student ID
    SELECT COALESCE(MAX(student_id), 100) + 1 INTO next_id FROM Student;

    -- Insert student
    INSERT INTO Student (student_id, first_name, last_name, dob, college_id, mentor_id)
    VALUES (next_id, p_first_name, p_last_name, p_dob, p_college_id, p_mentor_id);

    SET p_student_id = next_id;
END //
DELIMITER ;

-- 9. insert company
DELIMITER //
CREATE PROCEDURE InsertCompany(
    IN p_name VARCHAR(100),
    IN p_type VARCHAR(50),
    IN p_location VARCHAR(100),
    IN p_contact VARCHAR(50),
    OUT p_company_id INT
)
BEGIN
    DECLARE next_id INT;

    SELECT COALESCE(MAX(company_id), 0) + 1 INTO next_id FROM Company;

    INSERT INTO Company (company_id, name, type, location, contact)
    VALUES (next_id, p_name, p_type, p_location, p_contact);

    SET p_company_id = next_id;
END //
DELIMITER ;

-- 10. insert college
DELIMITER //
CREATE PROCEDURE InsertCollege(
    IN p_name VARCHAR(100),
    IN p_address VARCHAR(255),
    IN p_contact VARCHAR(50),
    OUT p_college_id INT
)
BEGIN
    DECLARE next_id INT;

    SELECT COALESCE(MAX(college_id), 0) + 1 INTO next_id FROM College;

    INSERT INTO College (college_id, name, address, contact)
    VALUES (next_id, p_name, p_address, p_contact);

    SET p_college_id = next_id;
END //
DELIMITER ;

-- 11. insert mentor
DELIMITER //
CREATE PROCEDURE InsertMentor(
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_dob DATE,
    OUT p_mentor_id INT
)
BEGIN
    DECLARE next_id INT;

    -- Age check (optional but matches Student logic)
    IF TIMESTAMPDIFF(YEAR, p_dob, CURDATE()) < 18 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Mentor must be at least 18 years old';
    END IF;

    SELECT COALESCE(MAX(mentor_id), 0) + 1 INTO next_id FROM Mentor;

    INSERT INTO Mentor (mentor_id, first_name, last_name, dob)
    VALUES (next_id, p_first_name, p_last_name, p_dob);

    SET p_mentor_id = next_id;
END //
DELIMITER ;


-- 1. Function to calculate internship duration in days
DELIMITER //
CREATE FUNCTION GetInternshipDuration(p_internship_id INT)
RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE duration INT;
    
    SELECT DATEDIFF(end_date, start_date) INTO duration
    FROM Internship
    WHERE internship_id = p_internship_id;
    
    RETURN COALESCE(duration, 0);
END //
DELIMITER ;


-- 2. Function to calculate student age
DELIMITER //
CREATE FUNCTION GetStudentAge(p_student_id INT)
RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE student_age INT;
    
    SELECT TIMESTAMPDIFF(YEAR, dob, CURDATE()) INTO student_age
    FROM Student
    WHERE student_id = p_student_id;
    
    RETURN COALESCE(student_age, 0);
END //
DELIMITER ;


-- 3. Function to count applications by status for a student
DELIMITER //
CREATE FUNCTION CountApplicationsByStatus(
    p_student_id INT,
    p_status VARCHAR(50)
)
RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE app_count INT;
    
    SELECT COUNT(*) INTO app_count
    FROM Application
    WHERE student_id = p_student_id AND status = p_status;
    
    RETURN COALESCE(app_count, 0);
END //
DELIMITER ;


-- 4. Function to get average stipend by field
DELIMITER //
CREATE FUNCTION GetAverageStipendByField(p_field VARCHAR(100))
RETURNS DECIMAL(10,2)
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE avg_stipend DECIMAL(10,2);
    
    SELECT AVG(stipend) INTO avg_stipend
    FROM Internship
    WHERE field = p_field;
    
    RETURN COALESCE(avg_stipend, 0);
END //
DELIMITER ;


-- 5. Function to check if student has accepted application
DELIMITER //
CREATE FUNCTION HasAcceptedApplication(p_student_id INT)
RETURNS BOOLEAN
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE has_accepted INT;
    
    SELECT COUNT(*) INTO has_accepted
    FROM Application
    WHERE student_id = p_student_id AND status = 'Accepted';
    
    RETURN IF(has_accepted > 0, TRUE, FALSE);
END //
DELIMITER ;


-- 6. Function to get total students in a college
DELIMITER //
CREATE FUNCTION GetTotalStudentsInCollege(p_college_id INT)
RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE student_count INT;
    
    SELECT COUNT(*) INTO student_count
    FROM Student
    WHERE college_id = p_college_id;
    
    RETURN COALESCE(student_count, 0);
END //
DELIMITER ;


-- 7. Function to get company name by ID
DELIMITER //
CREATE FUNCTION GetCompanyName(p_company_id INT)
RETURNS VARCHAR(100)
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE company_name VARCHAR(100);
    
    SELECT name INTO company_name
    FROM Company
    WHERE company_id = p_company_id;
    
    RETURN COALESCE(company_name, 'Unknown');
END //
DELIMITER ;

-- 8. Get mentor id
DELIMITER //
CREATE FUNCTION GetMentorIdByStudent(p_student_id INT)
RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE mentorId INT;

    SELECT mentor_id 
    INTO mentorId
    FROM Mentor
    WHERE mentor_id = (
        SELECT s.mentor_id
        FROM Student s
        WHERE s.student_id = p_student_id
    );

    RETURN COALESCE(mentorId, 0);
END //
DELIMITER ;






CREATE TABLE IF NOT EXISTS Audit_Log (
    audit_id INT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(100),
    operation_type VARCHAR(20),
    record_id INT,
    old_values TEXT,
    new_values TEXT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 3️⃣ VALIDATION TRIGGERS
-- ============================================================

-- 1. Internship validation before insert
DELIMITER //
CREATE TRIGGER before_internship_insert
BEFORE INSERT ON Internship
FOR EACH ROW
BEGIN
    IF NEW.stipend < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Stipend cannot be negative';
    END IF;
    IF NEW.end_date <= NEW.start_date THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'End date must be after start date';
    END IF;
END //
DELIMITER ;

-- 2. Internship validation before update
DELIMITER //
CREATE TRIGGER before_internship_update
BEFORE UPDATE ON Internship
FOR EACH ROW
BEGIN
    IF NEW.stipend < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Stipend cannot be negative';
    END IF;
    IF NEW.end_date <= NEW.start_date THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'End date must be after start date';
    END IF;
END //
DELIMITER ;

-- 3. Job Offer validation
DELIMITER //
CREATE TRIGGER before_job_offer_insert
BEFORE INSERT ON Job_Offer
FOR EACH ROW
BEGIN
    IF NEW.package < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Package cannot be negative';
    END IF;
END //
DELIMITER ;

-- 4. Student age validation before insert
DELIMITER //
CREATE TRIGGER before_student_insert
BEFORE INSERT ON Student
FOR EACH ROW
BEGIN
    IF TIMESTAMPDIFF(YEAR, NEW.dob, CURDATE()) < 16 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Student must be at least 16 years old';
    END IF;
END //
DELIMITER ;

-- 5. Student age validation before update
DELIMITER //
CREATE TRIGGER before_student_update
BEFORE UPDATE ON Student
FOR EACH ROW
BEGIN
    IF TIMESTAMPDIFF(YEAR, NEW.dob, CURDATE()) < 16 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Student must be at least 16 years old';
    END IF;
END //
DELIMITER ;

-- 6. Application status validation before insert
DELIMITER //
CREATE TRIGGER before_application_insert
BEFORE INSERT ON Application
FOR EACH ROW
BEGIN
    IF NEW.status NOT IN ('Pending', 'Accepted', 'Rejected') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid status. Must be Pending, Accepted, or Rejected';
    END IF;
END //
DELIMITER ;

-- 7. Application status validation before update
DELIMITER //
CREATE TRIGGER before_application_update
BEFORE UPDATE ON Application
FOR EACH ROW
BEGIN
    IF NEW.status NOT IN ('Pending', 'Accepted', 'Rejected') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid status. Must be Pending, Accepted, or Rejected';
    END IF;
END //
DELIMITER ;

-- 8. Certificate issue date validation
DELIMITER //
CREATE TRIGGER before_certificate_insert
BEFORE INSERT ON Certificate
FOR EACH ROW
BEGIN
    DECLARE internship_end DATE;
    SELECT end_date INTO internship_end
    FROM Internship
    WHERE internship_id = NEW.internship_id;

    IF NEW.issue_date < internship_end THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Certificate cannot be issued before internship end date';
    END IF;
END //
DELIMITER ;

-- 9. Prevent deleting students with accepted applications
DELIMITER //
CREATE TRIGGER before_student_delete
BEFORE DELETE ON Student
FOR EACH ROW
BEGIN
    DECLARE accepted_count INT;
    SELECT COUNT(*) INTO accepted_count
    FROM Application
    WHERE student_id = OLD.student_id AND status = 'Accepted';
    
    IF accepted_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot delete student with accepted applications';
    END IF;
END //
DELIMITER ;

-- ============================================================
-- 4️⃣ AUDIT LOGGING TRIGGERS (FIXED)
-- ============================================================

-- A. Log all Application updates
DELIMITER //
CREATE TRIGGER after_application_update
AFTER UPDATE ON Application
FOR EACH ROW
BEGIN
    INSERT INTO Audit_Log (table_name, operation_type, record_id, old_values, new_values)
    VALUES (
        'Application',
        'UPDATE',
        NEW.application_id,
        CONCAT('status=', OLD.status, ', student_id=', OLD.student_id, ', company_id=', OLD.company_id),
        CONCAT('status=', NEW.status, ', student_id=', NEW.student_id, ', company_id=', NEW.company_id)
    );
END //
DELIMITER ;

-- B. Log Student deletions
DELIMITER //
CREATE TRIGGER after_student_delete
AFTER DELETE ON Student
FOR EACH ROW
BEGIN
    INSERT INTO Audit_Log (table_name, operation_type, record_id, old_values)
    VALUES (
        'Student',
        'DELETE',
        OLD.student_id,
        CONCAT('name=', OLD.first_name, ' ', OLD.last_name, ', dob=', OLD.dob, ', college_id=', OLD.college_id)
    );
END //
DELIMITER ;

-- C. Log Internship insertions (fixed field name)
DELIMITER //
CREATE TRIGGER after_internship_insert
AFTER INSERT ON Internship
FOR EACH ROW
BEGIN
    INSERT INTO Audit_Log (table_name, operation_type, record_id, new_values)
    VALUES (
        'Internship',
        'INSERT',
        NEW.internship_id,
        CONCAT('field=', NEW.field, ', stipend=', NEW.stipend, ', start_date=', NEW.start_date, ', end_date=', NEW.end_date)
    );
END //
DELIMITER ;
show tables;

ALTER TABLE Feedback
DROP PRIMARY KEY;

ALTER TABLE Feedback
MODIFY feedback_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY;

ALTER TABLE Goodies
DROP PRIMARY KEY;

ALTER TABLE Goodies
MODIFY goodie_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY;


ALTER TABLE Certificate
ADD COLUMN status VARCHAR(20) DEFAULT 'Pending';

ALTER TABLE Certificate DROP PRIMARY KEY;

ALTER TABLE Certificate
MODIFY certificate_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY;

ALTER TABLE Certificate
ADD UNIQUE KEY unique_internship (internship_id);
