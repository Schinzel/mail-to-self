package io.schinzel.mailtoself;

import com.atexpose.Expose;
import com.atexpose.util.mail.GmailEmailSender;
import com.atexpose.util.mail.IEmailSender;
import io.schinzel.basicutils.configvar.ConfigVar;

/**
 * The purpose of this class is to send mails
 */
public class Sender {
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
        emailSender.send("henrik@schinzel.se", "Sub", "Kropp", "Schinzel");
        return "Mail sent: '" + message + "'";
    }
}
