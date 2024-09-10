package cs210_Labs;

import java.io.File;
import java.util.Scanner;

public class StackReader {
	
    public static void main(String[] args) 
    {
        File file = new File(""); //Enter file path

        int inputSize = 1000;
        String[] input = new String[inputSize];
        try 
        {
            Scanner scan = new Scanner(file);
            
            for(int i = 0; i < inputSize; i++) 
            {
                input[i] = scan.nextLine();
            }
            scan.close();
        } 
        catch (Exception e) 
        {
            System.err.println(e);
        }

    }
}
