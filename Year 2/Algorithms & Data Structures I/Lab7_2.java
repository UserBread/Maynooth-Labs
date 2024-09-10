//Queue ver.
package cs210_Labs;

public class Lab7_2 {
	
	public static void main(String[] args) {
        FileIO reader = new FileIO();
        String[] input = reader.load(""); //Enter file path
        //Reading the File as a String array
 
        Queue queue = new Queue(100);
        for (int i = 0, len = input.length; i < len; i++)
        {
        	if (input[i].contains("INSERT"))
        	{
        		queue.insert(input[i].substring(7));
        	}
        	else if (input[i].contains("REMOVE"))
        	{
        		queue.remove();
        	}
        }
        System.out.println(queue.peekFront());
	}
}
