import java.util.*;

public class Lab5_BinaryTrees 
{	
	public static void main(String [] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter the numbers to insert: ");
		String ListOfNumbers = sc.nextLine();
		sc.close();
		
		BinaryTree tree = new BinaryTree();
		String [] numbers = ListOfNumbers.split(",");
		
		for (int i = 0; i < numbers.length; i++) {
			int num = Integer.parseInt(numbers[i]);
			tree.insert(num);
		}
		
		System.out.println("The resulting binary tree has " + tree.countLevels(tree.root) + " levels");
		
	}
}

class BTNode 
{
	int data;
	BTNode leftPointer, rightPointer;
}

class BinaryTree 
{
	BTNode root;
	public void insert (int id) {
		BTNode newNode = new BTNode();
		newNode.data = id;
		if (root == null) root = newNode;
		else {
			BTNode current = root;
			BTNode parent;
			while (true) {
				parent = current;
				if (id < current.data) {
					current = current.leftPointer;
					if (current == null) {
						parent.leftPointer = newNode;
						return;
					}
				}
				else {
					current = current.rightPointer;
					if (current == null) {
						parent.rightPointer = newNode;
						return;
					}
				}
			}
 		}
	}
	public int countLevels(BTNode root) {
		if (root == null) return 0;
		
		int leftLevels = countLevels(root.leftPointer);
		int rightLevels = countLevels(root.rightPointer);
		return Math.max(leftLevels, rightLevels) + 1;
	}
}
