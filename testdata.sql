INSERT INTO public.hairsalon(
	id, name, description, street, plz, place, phonenumber, mail)
	VALUES (1, 'Irdins coiffeur', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu', 
			
			'Bahnhofstrasse 3', '8804', 'Zürich', '079 558 43 83', 'irdin.ibisevic@gmail.com');
	
	
	-- Insert images associated with the hairdresser
INSERT INTO image (link, hairsalon_id) VALUES
    ('https://www.coiffure-armida.ch/wp-content/uploads/2020/05/Coiffeur_Muri_Salon_.jpg', 1),
    ('https://lh3.googleusercontent.com/p/AF1QipODfoH--4h9B3ZOgm6IoeH12_5ocBSy7Hs-4tOv=s680-w680-h510', 1),
    ('https://lh3.googleusercontent.com/p/AF1QipO-PbtD9Dsm9OwftUfuyT9cNoL8sdAhJWr1w_u2=s680-w680-h510', 1); 
	
	
	
	

	
	INSERT INTO public."daily-opening-hours"(
	id, day, open_morning, closing_morning, has_lunch_break, open_afternoon, closing_afternoon, hairsalon_id, closed)
	VALUES (1, 1, '08:00', '12:00', true, '13:00', '17:00', 1, false);
	
	INSERT INTO public."daily-opening-hours"(
	id, day, open_morning, closing_morning, has_lunch_break, open_afternoon, closing_afternoon, hairsalon_id, closed)
	VALUES (2, 2, '08:00', '12:00', true, '13:00', '20:00', 1, false);
	
	INSERT INTO public."daily-opening-hours"(
	id, day, open_morning, closing_morning, has_lunch_break, open_afternoon, closing_afternoon, hairsalon_id, closed)
	VALUES (3, 3, '08:00', '12:00', true, '13:00', '20:00', 1, false);
	
	INSERT INTO public."daily-opening-hours"(
	id, day, open_morning, closing_morning, has_lunch_break, open_afternoon, closing_afternoon, hairsalon_id, closed)
	VALUES (4, 4, '08:00', '12:00', true, '13:00', '20:00', 1, false);
	
	INSERT INTO public."daily-opening-hours"(
	id, day, open_morning, closing_morning, has_lunch_break, open_afternoon, closing_afternoon, hairsalon_id, closed)
	VALUES (5, 5, '08:00', '12:00', true, '13:00', '20:00', 1, false);
	
	INSERT INTO public."daily-opening-hours"(
	id, day, open_morning, closing_morning, has_lunch_break, open_afternoon, closing_afternoon, hairsalon_id, closed)
	VALUES (6, 6, '08:00', '12:00', false, '13:00', '20:00', 1, false);
	
	INSERT INTO public."daily-opening-hours"(
	id, day, open_morning, closing_morning, has_lunch_break, open_afternoon, closing_afternoon, hairsalon_id, closed)
	VALUES (7, 7, '08:00', '12:00', true, '13:00', '20:00', 1, true);
	
	
	
	
	
	INSERT INTO public.service(
	id, name, price, duration, hairsalon_id)
	VALUES (1, 'Haare schneiden', 25, '15M', 1);
	
	INSERT INTO public.service(
	id, name, price, duration, hairsalon_id)
	VALUES (2, 'Bart kürzen', 14.50, '10M', 1);
	
	INSERT INTO public.service(
	id, name, price, duration, hairsalon_id)
	VALUES (3, 'Augenbrauen kürzen', 9.65, '5M', 1);
	
	
	INSERT INTO public.appointment(
	id, appointmentidentifier, firstname, lastname, mail, telephone, description, duration, price, date, hairsalon_id)
	VALUES (1, '98f560b6-aad3-47d7-ba61-9e3a2360bd30', 'Peter', 'Pan', 'peter.pan@mail.ch', '079 824 67 99', 'Lorem ipsum solor dit amet',  '50M', 50, '2023-10-31', 1);
	
		-- 1st statement
	INSERT INTO public.appointment(
		id, appointmentidentifier, firstname, lastname, mail, telephone, description, duration, price, date, hairsalon_id)
	VALUES (5, '19e761b1-aac4-47a7-bb51-9a4a2567bd21', 'John', 'Doe', 'john.doe@mail.ch', '079 824 67 89', 'Lorem ipsum solor dit amet',  '10M', 60, '2023-10-31', 1);

	-- 2nd statement
	INSERT INTO public.appointment(
		id, appointmentidentifier, firstname, lastname, mail, telephone, description, duration, price, date, hairsalon_id)
	VALUES (6, '20f872c2-aad5-48a8-bc52-9b5b2678cd32', 'Alice', 'Wonderland', 'alice.wonderland@mail.ch', '079 824 67 78', 'Lorem ipsum solor dit amet',  '20M', 70, '2023-10-31', 1);

	-- 3rd statement
	INSERT INTO public.appointment(
		id, appointmentidentifier, firstname, lastname, mail, telephone, description, duration, price, date, hairsalon_id)
	VALUES (7, '31g983d3-aae6-49b9-bd53-9c6c2789de43', 'Bob', 'Builder', 'bob.builder@mail.ch', '079 824 67 67', 'Lorem ipsum solor dit amet',  '30M', 80, '2023-10-31', 1);

	-- 4th statement
	INSERT INTO public.appointment(
		id, appointmentidentifier, firstname, lastname, mail, telephone, description, duration, price, date, hairsalon_id)
	VALUES (8, '42h094e4-aaf7-50c1-be54-9d7d2890ef54', 'Charlie', 'Chocolate', 'charlie.chocolate@mail.ch', '079 824 67 56', 'Lorem ipsum solor dit amet',  '40M', 90, '2023-10-31', 1);

	-- 5th statement
	INSERT INTO public.appointment(
		id, appointmentidentifier, firstname, lastname, mail, telephone, description, duration, price, date, hairsalon_id)
VALUES (9, '53i105f5-aag8-61d2-cf65-9e8e2991gf65', 'David', 'Dream', 'david.dream@mail.ch', '079 824 67 45', 'Lorem ipsum solor dit amet',  '65M', 100, '2023-10-31', 1);

INSERT INTO public.appointment(
    id, appointmentidentifier, firstname, lastname, mail, telephone, description, duration, price, date, hairsalon_id)
VALUES (10, '23j215g6-aag9-72e3-de76-7f9f3092gh76', 'Luis', 'Muriel', 'luis.muriel@mail.ch', '079 834 78 56', 'Lorem ipsum solor dit amet', '45M', 75, '2023-10-30', 1);