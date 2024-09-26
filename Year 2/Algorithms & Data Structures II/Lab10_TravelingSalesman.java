//Travelling Salesman using Nearest Neighbour Algorithm

import java.io.*;
import java.util.*;

public class Lab10_TravelingSalesman {

    public static void main(String[] args) {

        // Load data from CSV
        String filePath = ""; //Insert file path
        int[][] distances = loadDistances(filePath);
        if (distances == null) {

            return; // Exit if loading failed
        }

        // Compute the route using Nearest Neighbor Algorithm
        int[] route = nearestNeighbor(distances);
        // Calculate total distance
        int totalDistance = calculateTotalDistance(distances, route);

        // Print the route
        System.out.println("Route:");
        for (int i : route) {
            System.out.print(i + "->");
        }
        System.out.println("back to Apache Pizza");
        // Print the total distance
        System.out.println("Total Distance: " + totalDistance + " meters");
    }

    // Load the distances from the CSV file into a 2D array
    public static int[][] loadDistances(String filePath) {
        File file = new File(filePath);
        int[][] distances = new int[100][100];
        try (Scanner scan = new Scanner(file)) {

            for (int i = 0; i < 100; i++) {

                String line = scan.nextLine();
                String[] parts = line.split(",");
                for (int j = 0; j < 100; j++) {

                    distances[i][j] = Integer.parseInt(parts[j + 1].trim());
                }
            }
        } catch (Exception e) {

            System.err.println("Error loading the file: " + e.getMessage());
            return null;
        }
        return distances;
    }

    // Compute the route using the Nearest Neighbor Algorithm
    public static int[] nearestNeighbor(int[][] distances) {

        // Initialize variables for tracking visited locations, route, and current
        // location
        boolean[] visited = new boolean[100]; // Keeps track of visited locations
        int[] route = new int[101]; // Includes return to start
        int currentLocation = 0; // Starting location
        int routeIndex = 0; // Index for adding locations to the route
        // Add the starting location to the route and mark it as visited
        route[routeIndex++] = currentLocation;
        visited[currentLocation] = true;

        // Iterate through the remaining locations
        for (int i = 1; i < 100; i++) {

            int nearest = -1; // Variable to store the nearest unvisited location
            int shortestDistance = Integer.MAX_VALUE; // Variable to store the shortest distance to the nearest location
            // Find the nearest unvisited location
            for (int j = 0; j < 100; j++) {

                if (!visited[j] && distances[currentLocation][j] < shortestDistance) {
                    nearest = j;
                    shortestDistance = distances[currentLocation][j];
                }
            }
            // Mark the nearest location as visited and add it to the route
            visited[nearest] = true;
            route[routeIndex++] = nearest;
            currentLocation = nearest;
        }
        route[routeIndex] = 0; // Return to start
        return route;
    }


    // Calculate the total distance of the route
    public static int calculateTotalDistance(int[][] distances, int[] route) {

        int totalDistance = 0;
        for (int i = 0; i < 100; i++) {

            totalDistance += distances[route[i]][route[i + 1]];
        }
        return totalDistance;
    }
}
