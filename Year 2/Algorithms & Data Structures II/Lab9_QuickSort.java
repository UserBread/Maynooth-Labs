//TODO fix so that it sorts properly
import java.util.*;

public class Lab9_QuickSort {
//how would you get the number of a collatz of 64
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        int nth = sc.nextInt();
        sc.close();

        int size = 100000;
        long[] numbers = new long[size];
        long[] collatz = new long[size];

        for (int i = 0; i < size; i++) {
            numbers[i] = (i + 1);
            collatz[i] = getCollatz(i + 1);
        }
        quickSort(numbers, collatz, 0, size - 1);
        // System.out.println("Number: " + numbers[nth-1]);
        // System.out.println("Collatz Length: " + collatz[nth-1]);
        System.out.println("1st: " + numbers[0]);
        System.out.println("10th: " + numbers[9]);
        System.out.println("100th: "  + numbers[99]);
        System.out.println("1000th: " + numbers[999]);
    }
    static int getCollatz(int number) {

        int counter = 0;
        while (number != 1) {

            if (number % 2 == 0) {
                number /= 2;
            } else {
                number *= 3;
                number += 1;
            }
            counter++;
        }
        return counter;
    }

    static void quickSort(long[] numbers, long[] collatz, int low, int high) {

        if (low < high) {
            int pivot = partition(numbers, collatz, low, high);
            quickSort(numbers, collatz, low, pivot - 1);
            quickSort(numbers, collatz, pivot + 1, high);
        }
    }

    static int partition(long[] numbers, long[] steps, int low, int high) {
        long pivot = steps[high];
        int k = low-1;

        for (int i = low; i < high; i++) {
            if (steps[i] < pivot) {
                k++;
                swap(numbers, i, k);
                swap(steps, i, k);
            }
            else if (steps[i] == pivot) {
                while (k >= low && numbers[k] > numbers[i]) {
                    k--;
                }
                k++;
                swap(numbers, i, k);
                swap(steps, i, k);
            }
        }
        swap(numbers, k+1, high);
        swap(steps, k+1, high);
        return k+1;
    }

    static void swap(long[] array, int i, int j) {
        long temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
