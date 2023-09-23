INSERT INTO public.hairsalon(
	id, name, description, street, plz, place, phonenumber, mail)
	VALUES (1, 'irdins coiffeur', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu', 
			
			'Bahnhofstrasse 3', '8804', 'Zürich', '079 558 43 83', 'irdin.ibisevic@gmail.com');
	
	
	-- Insert images associated with the hairdresser
INSERT INTO image (link, hairsalon_id) VALUES
    ('https://www.coiffure-armida.ch/wp-content/uploads/2020/05/Coiffeur_Muri_Salon_.jpg', 1),
    ('https://lh3.googleusercontent.com/p/AF1QipODfoH--4h9B3ZOgm6IoeH12_5ocBSy7Hs-4tOv=s680-w680-h510', 1),
    ('https://lh3.googleusercontent.com/p/AF1QipO-PbtD9Dsm9OwftUfuyT9cNoL8sdAhJWr1w_u2=s680-w680-h510', 1);