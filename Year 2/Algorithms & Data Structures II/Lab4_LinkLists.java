import java.util.*;

public class Lab4_LinkLists 
{
	public static void main(String [] args) {
		
		Scanner sc = new Scanner(System.in);
		System.out.print("Enter a word: ");
		String input = sc.nextLine();
		LinkList newLinkList = new LinkList();
		
		while(!(input.equalsIgnoreCase("end"))) {
			newLinkList.insertHead(input);
			System.out.print("Enter a word: ");
			input = sc.nextLine();
			
		}	
		sc.close();
		newLinkList.display();
	}
}
class LinkList
{
	private LLNode first;
	
	public LinkList() {
		first = null;
	}
	
	public boolean isEmpty() {
		return (first == null);
	}
	
	public void insertHead(String number) {
		LLNode newNode = new LLNode(number);
		newNode.next = first;
		first = newNode;
	}
	
	public LLNode deleteHead() {
		LLNode temp = first;
		first = first.next;
		return temp;
	}
	
	public void display() {
		LLNode current = first;
		while (current != null) {
			current.displayNode();
			current = current.next;
		}
	}
}

class LLNode 
{
	public String data;
	public LLNode next;
	
	public LLNode(String number) {
		data = number;
	}

	public void displayNode() {
		System.out.println(data);
		
	}
}

