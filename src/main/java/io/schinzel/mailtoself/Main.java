package io.schinzel.mailtoself;

import com.atexpose.AtExpose;
import com.atexpose.dispatcher.logging.Logger;
import com.atexpose.dispatcher.logging.LoggerType;
import com.atexpose.dispatcher.logging.format.LogFormatterFactory;
import com.atexpose.dispatcher.logging.writer.LogWriterFactory;
import io.schinzel.basicutils.configvar.ConfigVar;

/**
 * The purpose of this class is to start mail-to-self application
 */
public class Main {

    public static void main(String[] args) {
        renderStartUpMessage();
        AtExpose.create()
                .expose(new API())
                .startCLI()
                .getWebServerBuilder()
                .port(getPort())
                .accessLevel(1)
                .cacheFilesInRAM(isProduction())
                .webServerDir("website/mailtoself")
                .startWebServer()
                .addLogger(getEventLogger());
    }


    /**
     * Render a system start message.
     */
    private static void renderStartUpMessage() {
        System.out.println("***************************************");
        System.out.println("****                               ****");
        System.out.println("****       -= Mail To Self =-      ****");
        System.out.println("****                               ****");
        System.out.println("***************************************");
    }


    /**
     * @return The port the web server should use.
     */
    private static int getPort() {
        return Integer.valueOf(ConfigVar.create(".env")
                .getValue("PORT"));
    }


    /**
     * @return True if current environment is production. Else false.
     */
    private static boolean isProduction() {
        return ConfigVar.create(".env")
                .getValue("ENVIRONMENT")
                .equalsIgnoreCase("production");
    }


    /**
     * @return The event logger to use to log requests to web server.
     */
    private static Logger getEventLogger() {
        return Logger.builder()
                .loggerType(LoggerType.EVENT)
                .logFormatter(LogFormatterFactory.JSON.create())
                .logWriter(LogWriterFactory.SYSTEM_OUT.create())
                .build();
    }

}
