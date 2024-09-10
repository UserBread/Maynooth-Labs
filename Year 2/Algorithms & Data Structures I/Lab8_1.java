package cs210_Labs;

import java.io.File;
import java.util.Scanner;

public class Lab8_1 {
	
    public static void main(String[] args) {
    	
    	File file = new File(""); //Enter File path

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
         
       PriorityQueue PQ = new PriorityQueue(500);
       
       for (int i = 0; i < inputSize; i++){
    	   if (input[i].contains("INSERT")) {
    		   PQ.insert(input[i].substring(7));
    	   }
    	   else if (input[i].contains("REMOVE")) {
    		   PQ.remove();
    	   }
    	   else if (input[i].contains("PEEK")) {
    		   System.out.println(PQ.peekFront());
    	   }
       }
    	
    }
}
