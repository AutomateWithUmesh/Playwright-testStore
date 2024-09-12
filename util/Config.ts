import PropertiesReader from 'properties-reader';
import * as fs from 'fs';
import * as path from 'path';
import Logger from './Logger'; 

const logger = Logger.getLogger();  // Get the logger instance

class Config {
    private static properties: any;
    private static readonly DEFAULT_PROPERTIES = path.resolve(__dirname, '../config/default.properties');

    /**
     * Initializes the configuration by loading properties from the default file
     * and overriding with any system properties if present.
     */
    public static initialize(): void {
        // Load properties from the file
        this.properties = this.loadProperties();

        // Override with system environment variables
        for (const [key, value] of Object.entries(this.properties.getAllProperties())) {
            if (process.env[key]) {
                this.properties.set(key, process.env[key]);
            }
        }

        // Log properties for debugging purposes
        logger.info('Test Properties');
        logger.info('-----------------');
        for (const [key, value] of Object.entries(this.properties.getAllProperties())) {
            logger.info(`${key}=${value}`);
        }
        logger.info('-----------------');
    }

    /**
     * Retrieves the property value for the specified key.
     * 
     * @param key The property key
     * @return The property value
     */
    public static get(key: string): string | undefined {
        return this.properties.get(key);
    }

    /**
     * Loads properties from the default properties file.
     * 
     * @return Properties object containing the loaded properties
     */
    private static loadProperties(): any {
        try {
            // Check if the default properties file exists
            if (fs.existsSync(this.DEFAULT_PROPERTIES)) {
                return PropertiesReader(this.DEFAULT_PROPERTIES);
            } else {
                logger.error(`Property file not found: ${this.DEFAULT_PROPERTIES}`);
                throw new Error(`Property file not found: ${this.DEFAULT_PROPERTIES}`);
            }
        } catch (error) {
            logger.error(`Unable to read the property file: ${error.message}`);
            throw error;
        }
    }
}

export default Config;
