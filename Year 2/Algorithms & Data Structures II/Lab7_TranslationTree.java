import java.io.File;
import java.util.Scanner;
// import java.util.LinkedList;
// import java.util.Queue;

public class Lab7_TranslationTree {
    public static void main(String[] args) {
        // import file
        TranslationTree mytree = new TranslationTree();

        File file = new File(""); //Enter file path
        int inputSize = 28636;
        String[] input = new String[inputSize];
        String[] englishWords = new String[inputSize];
        String[] spanishWords = new String[inputSize];
        try {
            Scanner scan = new Scanner(file);

            // Splitting the input into arrays containing english and spanish words
            // respectively
            for (int i = 0; i < inputSize; i++) {
                input[i] = scan.nextLine();
                String[] words = input[i].split(",");
                englishWords[i] = words[0];
                spanishWords[i] = words[1];
            }
            scan.close();
        } catch (Exception e) {
            System.err.println(e);
        }

        /*
         * Start in the middle of the array and insert middle value
         * split into two arrays
         * get the mid point of the left side and insert that value
         * repeat 2 & 3 until there are no more values
         * do 2 - 4 with the right side
         */

        mytree.insertMidpoints(englishWords, spanishWords, 0, inputSize - 1);
        System.out.println("Tree height: " + mytree.height());
        // mytree.printLevelByLevel();
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter text in English to translate to Spanish ");
        String inputString = sc.nextLine();
        sc.close();

        //translate sentances
        String [] inputStrings = inputString.split(" ");
        for (int i = 0; i < inputStrings.length; i++) {
            System.out.print(mytree.translate(inputStrings[i]) + " ");
        }
        System.out.println("\nSteps: " + mytree.steps());
    }
}

class Node {
    String english;
    String spanish;
    Node left, right;

    public Node(String eng, String esp) {
        english = eng;
        spanish = esp;
        left = null;
        right = null;
    }
}

class TranslationTree {
    Node root;
    int steps = 0;
    public TranslationTree() {
        root = null;
    }

    public void insert(String english, String spanish) {
        root = insertRecursive(root, english, spanish);
    }
    private Node insertRecursive(Node current, String english, String spanish) {
        if (current == null) {
            return new Node(english, spanish);
        }

        if (english.compareTo(current.english) < 0) {
            current.left = insertRecursive(current.left, english, spanish);
        } else if (english.compareTo(current.english) > 0) {
            current.right = insertRecursive(current.right, english, spanish);
        }
        return current;
    }
    public void insertMidpoints(String[] english, String[] spanish, int start, int end) {
        if (start <= end) {
            int middle = (start + end) / 2;
            insert(english[middle], spanish[middle]);
            insertMidpoints(english, spanish, start, middle - 1);
            insertMidpoints(english, spanish, middle + 1, end);
        }
    }

    public int height() {
        return heightRecursive(root);
    }
    private int heightRecursive(Node current) {
        if (current == null) {
            return 0;
        }
        int leftHeight = heightRecursive(current.left);
        int rightHeight = heightRecursive(current.right);
        return 1 + Math.max(leftHeight, rightHeight);
    }
    // public void printLevelByLevel() {
    //     if (root == null) return;

    //     Queue<Node> queue = new LinkedList<>();
    //     queue.add(root);

    //     while (!queue.isEmpty()) {
    //         int levelSize = queue.size(); // Number of elements at the current level

    //         for (int i = 0; i < levelSize; i++) {
    //             Node currentNode = queue.poll();
    //             System.out.print(currentNode.spanish + " "); // Print the node's value

    //             if (currentNode.left != null) {
    //                 queue.add(currentNode.left);
    //             }
    //             if (currentNode.right != null) {
    //                 queue.add(currentNode.right);
    //             }
    //         }
    //         System.out.println(); // Move to the next line after each level
    //     }
    // }
    public String translate (String key){
        Node current = root;
        while(current.english != key){
            steps++;
            if (key.equals(current.english)) return current.spanish;
            else if(key.compareTo(current.english) < 0) current=current.left;
            else current=current.right;
            if(current == null) return null;
            }
        return current.english;
    }
    public int steps () {
        return steps;
    }
}
