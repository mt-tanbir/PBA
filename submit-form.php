<?php
header('Content-Type: application/json');

// Sanitize and validate input
$firstName = htmlspecialchars(trim($_POST['firstName'] ?? ''));
$lastName = htmlspecialchars(trim($_POST['lastName'] ?? ''));
$email = htmlspecialchars(trim($_POST['email'] ?? ''));
$phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
$state = htmlspecialchars(trim($_POST['state'] ?? ''));
$investmentAmount = htmlspecialchars(trim($_POST['investmentAmount'] ?? ''));
$investmentTimeline = htmlspecialchars(trim($_POST['investmentTimeline'] ?? ''));

if (!$firstName || !$lastName || !$email || !$investmentAmount || !$investmentTimeline) {
    echo json_encode(['success' => false, 'message' => 'All required fields must be filled.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

// Email configuration
$to = "youremail@example.com"; // Replace with your email address
$subject = "New Form Submission";
$headers = "From: noreply@example.com\r\n"; 
$headers .= "Reply-To: $email\r\n";

// Email message
$email_message = "
You have received a new form submission:

First Name: $firstName
Last Name: $lastName
Email: $email
Phone: $phone
State: $state
Investment Amount: $investmentAmount
Investment Timeline: $investmentTimeline
";

try {
    // Send email
    if (mail($to, $subject, $email_message, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send the email. Please try again later.']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'An error occurred. Please try again later.']);
}
?>
