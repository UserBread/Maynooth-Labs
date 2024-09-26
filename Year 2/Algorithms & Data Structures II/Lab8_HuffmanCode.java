import java.util.*;

//If error is encountered with the PrioQueue and Queue uncomment these two imports
//import java.util.Queue;
//import java.util.PriorityQueue;

public class Lab8_HuffmanCode {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        sc.close();
        int [] asciiFrequency = new int[127];
        PriorityQueue <Tree> PQ = new PriorityQueue <Tree>() ;  //make a priority queue to hold the forest of trees

        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            asciiFrequency[(int) c]++;
        }

        for (int i = 0; i < asciiFrequency.length; i++) {
            if (asciiFrequency[i] > 0) {
                System.out.println("'" + (char)i + "'" + " has a frequency of " + asciiFrequency[i]);
                Node node = new Node((char)i, asciiFrequency[i]);
                PQ.add(new Tree(node));	//adding Trees into the Priority Queue
            }
        }
        System.out.println();

        while (PQ.size() > 1) {
            Tree t1 = PQ.poll();
            Tree t2 = PQ.poll();

            Tree mergedTree = new Tree(t1, t2);
            PQ.add(mergedTree);

        }	//keep looping while the PQ has more than 1 tree - take out two trees, combine them, and put them back in

        Tree HuffmanTree = PQ.poll();   //when there's only 1 tree left in the PQ, it's the Huffman tree!
        HuffmanTree.printLevelByLevel();
        System.out.println();

        for (int i = 0; i < asciiFrequency.length; i++) {
            if (asciiFrequency[i] > 0) {
                HuffmanTree.encode((char)i);
            }
        }
    }
}

class Tree implements Comparable<Tree>{
    public Node root;             //first node of tree
    public int frequency;	//this is the weighting of the tree so that it can be ordered
 
    public Tree(Node node){                // constructor
        root = node;
        frequency = node.frequency;             // no nodes in tree yet
    }

    //Merge 2 trees
    public Tree (Tree t1, Tree t2) {
        frequency = t1.frequency + t2.frequency;
        root = new Node('@', frequency);
        root.left = t1.root;
        root.right = t2.root;
    }

    public void encode(char letter) {
        String code = "";
        getCode(root, code, letter);
    }
    public void getCode(Node current, String code, char letter) {
        if (current.left == null && current.right == null && current.letter == letter) {
            System.out.println(current.letter + ":" + code);
            return;
        }
        else if (current.left == null && current.right == null) return;
        getCode(current.left, code + "0", letter);
        getCode(current.right, code + "1", letter);
    }
    public void printLevelByLevel() {
        if (root == null) return;

        Queue<Node> queue = new LinkedList<>();
        queue.add(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size(); // Number of elements at the current level

            for (int i = 0; i < levelSize; i++) {
                Node currentNode = queue.poll();
                System.out.print(currentNode.letter + ":" + currentNode.frequency + " "); // Print the node's value

                if (currentNode.left != null) {
                    queue.add(currentNode.left);
                }
                if (currentNode.right != null) {
                    queue.add(currentNode.right);
                }
            }
            System.out.println(); // Move to the next line after each level
        }
    }
    public int compareTo(Tree object){ //
        if (frequency - object.frequency > 0){ //compare the cumulative frequencies of the tree
            return 1;
         }
        else if (frequency - object.frequency < 0){
            return -1;   //return 1 or -1 depending on whether these frequencies are bigger or smaller
         }
         return 0;   //return 0 if they're the same
    }
}  
 
class Node{
    char letter;       //stores the letter for this leaf
    int frequency;
    Node left;         // this node's left child
    Node right;        // this node's right child

    public Node(char letter, int frequency) {
        this.letter = letter;
        this.frequency = frequency;
        left = right = null;
    }
}
 
