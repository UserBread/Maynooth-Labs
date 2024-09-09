import java.util.Scanner;

public class Lab3_1 {
	
	public static void main(String [] args)
	{
		Scanner sc = new Scanner(System.in);
		System.out.println("Please enter the desired size of your matrix: ");
		int size = sc.nextInt();
		int [][] matrix = new int [size][size];
		
		for (int i = 0; i < size; i++)
		{
			for (int j = 0; j < size; j++)
			{
				matrix[i][j] = sc.nextInt();
			}
		}
		sc.close();
		transpose(matrix, size);
	}
	
	public static void transpose(int [][] matrix, int size)
	{
		int [][] T_matrix = new int [size][size];
		for (int i = 0; i < size; i++)
		{
			for (int j = 0; j < size; j++)
			{
				T_matrix[i][j] = matrix[j][i];
			
			}
		}
		
		
		for (int i = 0; i < size; i++)
		{
			for (int j = 0; j < size; j++)
			{
				System.out.print(T_matrix[i][j] + " ");
			}
			System.out.println("");
		}
	}
}