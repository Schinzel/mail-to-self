package io.schinzel.mailtoself;

import com.atexpose.AtExpose;
import com.atexpose.dispatcher.logging.Logger;
import com.atexpose.dispatcher.logging.LoggerType;
import com.atexpose.dispatcher.logging.format.LogFormatterFactory;
import com.atexpose.dispatcher.logging.writer.LogWriterFactory;

public class Main {

    public static void main(String[] args) {
        //Render start message
        System.out.println("***************************************");
        System.out.println("****                               ****");
        System.out.println("****       -= Mail To Self =-      ****");
        System.out.println("****                               ****");
        System.out.println("***************************************");
        AtExpose.create()
                .startCLI()
                .getWebServerBuilder()
                .port(5555)
                .accessLevel(1)
                .cacheFilesInRAM(false)
                .webServerDir("website")
                .startWebServer()
                .addLogger(getEventLogger());
    }


    private static Logger getEventLogger() {
        return Logger.builder()
                .loggerType(LoggerType.EVENT)
                .logFormatter(LogFormatterFactory.JSON.getInstance())
                .logWriter(LogWriterFactory.SYSTEM_OUT.getInstance())
                .build();
    }
}
