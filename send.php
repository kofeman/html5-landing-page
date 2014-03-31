<?php

$sendto  = "";//Адреса, куда будут приходить письма

$phone  = $_POST['phone'];
$name  = $_POST['name'];
$email  = $_POST['email'];
$product  = $_POST['product'];
// Формирование заголовка письма
$subject  = "Новая заявка";
$headers  = "From: " .$name."\r\n";
$headers .= "Reply-To: ".$email."\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=utf-8 \r\n";
// Формирование тела письма
$msg  = "<html><head><meta charset='utf-8'></head><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2>Новая заявка</h2>\r\n";
$msg .= "<p><strong>Имя:</strong> ".$name."</p>\r\n";
$msg .= "<p><strong>Телефон:</strong> ".$phone."</p>\r\n";
$msg .= "<p><strong>Email:</strong> ".$email."</p>\r\n";
$msg .= "<p><strong>Заказ:</strong> ".$product."</p>\r\n";
$msg .= "</body></html>";

// отправка сообщения
@mail($sendto, $subject, $msg, $headers)) {
	echo "true";
} else {
	echo "false";
}

?>