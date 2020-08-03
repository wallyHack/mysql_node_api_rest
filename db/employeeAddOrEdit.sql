
CREATE PROCEDURE employeeAddOrEdit{
	IN _ID INT,
    IN _NAME VARCHAR(45),
    IN _SALARY INT
}

BEGIN 
	IF _ID = 0 THEN 
	    INSERT INTO employees (NAME, SALARY) VALUES(_NAME, _SALARY);
        
    	SET _ID = LAST_INSERT_ID();
    ELSE
    	UPDATE employees
        SET 
        NAME = _NAME,
        SALARY = _SALARY
        WHERE ID = _ID;
    END IF;    
    
    SELECT _ID = ID;
END