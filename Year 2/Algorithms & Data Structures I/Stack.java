package cs210_Labs;

public class Stack {

	private int top;
	private String [] stack;
	private int size;
	
	public Stack(int s)
	{
		
		top = -1;
		size = s;
		stack = new String [size];
		
	}
	
	public void push(String n)
	{
		if(!isFull())
		{
			top++;
			stack[top] = n;
		}
		//System.out.println("Pushed: " + n);
	}
	
	public String pop()
	{
		if (isEmpty()) return null;
		//System.out.println("Popped: " + stack[top]);
		return stack[top--];
	}
	
	public String peek()
	{
		return stack[top];
	}
	
	public boolean isEmpty()
	{
		return (top == -1);
	}
	public boolean isFull()
	{
		return (top == size - 1);
	}
	public void makeEmpty()
	{
		top = -1;
	}
}
