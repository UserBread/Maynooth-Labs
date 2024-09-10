package cs210_Labs;

public class PriorityQueue {

	private int maxSize;
	private String[] queArray;
	//private int front;
	//private int rear;
	private int nItems;
	
	public PriorityQueue(int s)
	{
		maxSize = s;
		queArray = new String[maxSize];
		//front = 0;
		//rear = -1;
		nItems = 0;
		
	}
	public void insert(String s) {
		if (nItems == 0) queArray[0] = s;
		else {
			int j = nItems;
			
			//vowel
			while (j > 0 && (checkVowel(queArray[j-1]) > checkVowel(s))) {
				queArray[j] = queArray[j-1];
				j--;
			}
			//alphabetical
			while (j > 0 && (checkVowel(queArray[j-1]) == checkVowel(s))) {
				if (queArray[j-1].compareTo(s) < 0) {
					queArray[j] = queArray[j-1];
					j--;
				}
				else break;
			}
			queArray[j] = s;
		}
		nItems++;
		//System.out.println("Inserted:" + s);
	}
	public String remove() {
		if (isEmpty()) return null;
		String temp = queArray[nItems-1];
		nItems--;
		if (nItems < 0) nItems = 0;
		return temp;
	}
	public String peekFront() {
		return queArray[nItems-1];
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
	public static int checkVowel(String s) {
		int count = 0;
		for (int i = 0, len = s.length(); i < len; i++) {
			if (s.charAt(i) == 'a' || s.charAt(i) == 'e' || s.charAt(i) == 'i' || s.charAt(i) == 'o' || s.charAt(i) == 'u') {
				count++;
			}
		}
		return count;
	}
}
