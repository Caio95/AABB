<?php
require_once('class.phpmailer.php');
$errors = array();  	// array to hold validation errors
$data = array(); 		// array to pass back data
// validate the variables ======================================================
	if (empty($_POST['name']))
		$errors['name'] = 'Name is required.';
	if (empty($_POST['superheroAlias']))
		$errors['superheroAlias'] = 'E-mail is required.';
	if (empty($_POST['content']))
		$errors['content'] = 'Message is required.';
// return a response ===========================================================
	// response if there are errors
	if ( ! empty($errors)) {
		// if there are items in our errors array, return those errors
		$data['success'] = false;
		$data['errors']  = $errors;
		
	} else {
		$mail = new PHPMailer(); // create a new object
		$mail->IsSMTP(); // enable SMTP
		$mail->SMTPAuth = true; // authentication enabled
		$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for GMail
		$mail->Host = "smtp.gmail.com"; //smtplw.com.br -- do LocaWeb
		$mail->Port = 465; // or 587
		$mail->IsHTML(true);
		$mail->Username = ""; //Email that you setup
		$mail->Password = ""; // Password
		$mail->Subject = "Y-Web Contact mail from " . $_POST['name'] . ", e-mail: " .$_POST['superheroAlias']. "";
		$mail->Body = $_POST['content'];
		$mail->AddAddress(""); //Pass the e-mail that you setup
		 if(!$mail->Send())
		    {
		    		echo "Mailer Error: " . $mail->ErrorInfo;
		    }
		    else
		    {
		    	$data['success'] = true;
	    		$data['message'] = 'Thank you for sending e-mail.';
		    }
		
	}
	echo json_encode($data);
