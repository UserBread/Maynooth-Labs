package cs210_Labs;

public class Queue {

	private int maxSize;
	private String[] queArray;
	private int front;
	private int rear;
	private int nItems;
	
	public Queue(int s) {
		maxSize = s;
		queArray = new String[maxSize];
		front = 0;
		rear = -1;
		nItems = 0;
	}
	public boolean insert(String s) {
		if (isFull()) return false;
		if (rear == maxSize - 1) rear = -1;
		rear++;
		queArray[rear] = s;
		nItems++;
		//System.out.println("Inserted:" + s);
		return true;
	}
	public String remove() {
		if (isEmpty()) return (String) null;
		String temp = queArray[front];
		front++;
		if (front == maxSize) front = 0;
		nItems--;
		//System.out.println("Removed:" + temp);
		return temp;
	}
	public String peekFront() {
		return queArray[front];
	}
	
	public boolean isEmpty() {
		return (nItems == 0);
	}
	public boolean isFull() {
		return (nItems == maxSize);
	}
	public int size() {
		return nItems;
	}
}
