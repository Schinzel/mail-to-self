package io.schinzel.mailtoself;

import com.atexpose.Expose;
import com.atexpose.util.mail.GmailEmailSender;
import com.atexpose.util.mail.IEmailSender;
import io.schinzel.basicutils.configvar.ConfigVar;

/**
 * The purpose of this class is to send mails
 */
public class Sender {
    private static final int SUBJECT_MAX_LENGTH = 20;
    private final IEmailSender emailSender;


    Sender() {
        ConfigVar configVar = ConfigVar.create(".env");
        String userName = configVar.getValue("EMAIL_USER_NAME");
        String password = configVar.getValue("EMAIL_PASSWORD");
        emailSender = new GmailEmailSender(userName, password);
    }


    @Expose(
            requiredArgumentCount = 1,
            requiredAccessLevel = 1,
            arguments = {"Message"})
    String mailMe(String message) {
        String subject = message.length() > SUBJECT_MAX_LENGTH
                ? message.substring(0, SUBJECT_MAX_LENGTH) + "..."
                : message;
        Runnable r = () ->  emailSender.send("henrik@schinzel.se", subject, message, "Schinzel");
        new Thread(r, "email-send-thread").start();
        return "Mail sent: '" + message + "'";
    }
}
