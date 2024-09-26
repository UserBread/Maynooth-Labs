import java.io.*;
import java.util.*;
import java.util.Queue;
import java.util.Stack;

public class Lab11_DirectedGraph {

    public static void main(String[] args) {
        File file = new File("/Users/bread/Downloads/Graph.csv");
        String[] vertex = new String[10];
        int[][] distances = new int[10][10];

        try {

            Scanner scan = new Scanner(file);
            for (int i = 0; i < 10; i++) {
                String line = scan.nextLine();
                String[] parts = line.split(","); // Split the line by commas
                vertex[i] = parts[0]; //get the address

                for (int j = 0; j < 10; j++) {  //get the distances
                    distances[i][j] = Integer.parseInt(parts[j + 1].trim());
                }
            }
            scan.close();
        } catch (Exception e) {
            System.err.println(e);
        }

        Scanner scan = new Scanner(System.in);
        System.out.print("Please input starting vertex: ");
        String startVertex = scan.nextLine();
        scan.close();

        int[] path = new int[10];
        boolean[] visited = new boolean[10];

        getDistances(vertex, distances, visited, path, startVertex);
        for (int i = 0; i < 10; i++) {
            if (!visited[i]) {
                path[i] = -1;
            }
        }

        for (int i = 0; i < 10; i++) {
            System.out.println(vertex[i] + ": " + path[i]);
        }

    }
    public static void getDistances(String[] vertex, int[][] distances, boolean[] visited, int[] path, String startVertex) {

        for (int i = 0; i < 10; i++) {
            if(startVertex.equalsIgnoreCase(vertex[i])) { //Looks for the starting vertex in the vertex array
                visited[i] = true; //sets that vertex to visited

                for (int j = 0; j < 10; j++) { //Loops through the distances array
                    if (distances[i][j] != 0 && !visited[j] ) { //Looks for unvisited and connected vertices
                        if (path[j] < path[i]) {
                            path[j] = path[i];
                        }
                        path[j]++;  //Increments steps to vertex
                        getDistances(vertex, distances, visited, path, vertex[j]); //Calls function with new starting vertex
                    }
                }
            }
        }
    }
}

