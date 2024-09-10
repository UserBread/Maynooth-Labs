//Stack ver
package cs210_Labs;

//import java.util.Scanner;

public class Lab7_1 {
	
	public static void main(String [] args)
	{
        FileIO reader = new FileIO();
        String[] input = reader.load(""); //Enter path of file 
        //Reading the File as a String array
        
        Stack stack = new Stack(100);
        for (int i = 0, len = input.length; i < len; i++)
        {
        	if (input[i].contains("PUSH"))
        	{
        		stack.push(input[i].substring(5));
        	}
        	else if (input[i].contains("POP"))
        	{
        		stack.pop();
        	}
        }
        System.out.println(stack.peek());
	}
}
