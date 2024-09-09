import java.util.Scanner;

public class Lab5_1 {
	
	public static void main(String [] args)
	{
		Scanner sc = new Scanner(System.in);
		int Current_Base;
		int To_Base;
		String num;
		
		do
		{
			System.out.print("Base#1 = ");
			Current_Base = sc.nextInt();
			System.out.print("Base#2 = ");
			To_Base = sc.nextInt();
			System.out.print("Number in Base#1 = ");
			num = sc.next();
		} while((Current_Base < 2 && Current_Base > 32) && (To_Base < 2 && To_Base > 32));
		sc.close();
		
		long dec = toDec(num, Current_Base);
		String based = fromDec(dec, To_Base);
		System.out.println("Number in Base#2 = " + based);
		
	}
	
	public static long toDec (String num, int base) 
	{
		long decimal = 0;
		int sign = 1;
		//Convert to decimal from any base from 2 - 10 using the powers method
		if (base <= 10)
		{
			long n = Long.parseLong(num);
			if (n < 0)
			{
				sign = -1;
				n *= -1;
			}
			for (int i = 0; n > 0; i++)
			{
				decimal += n % 10 * Math.pow(base, i);
				n /= 10;
			}
			decimal *= sign;
		}
	
		//Convert to decimal form any base greater than 10 using ASCII and powers method
		else if (base <= 32 && base > 10)
		{
			int power = 0;
			if (num.charAt(0) == '-')
			{
				sign = -1;
			}
			for (int i = num.length() - 1; i >= 0; i--)
			{
				if (num.charAt(i) >= '0' && num.charAt(i) <= '9') 
				{
					decimal += (num.charAt(i) - '0') * Math.pow(base, power);
				}
				else if(num.charAt(i) >= 'A' && num.charAt(i) <= 'W')
				{
					decimal += (num.charAt(i) - 'A' + 10) * Math.pow(base, power);
				}
				power++;
			}
			decimal *= sign;
		}
		return decimal;
	}
	
	public static String fromDec (long dec, int base)
	{
		String based = "";
		//Convert decimal to any base from 2 - 10 using the remainders
		if (base <= 10)
		{
			int b = 0;
			int sign = 1;
			if (dec < 0)
			{
				sign = -1;
				dec *= sign;
			}
			for (int i = 0; dec > 0; i++)
			{
				b += (int) (dec % base * Math.pow(10, i));
				dec /= base;	
			}
			based = Integer.toString(b * sign);
		}
		
		//Convert decimal to any base greater than 10 using both remainders and ASCII
		else if (base <= 32 && base > 10)
		{
			if (dec < 0)
			{
				based = "-";
				dec *= -1;
			}
			long temp = 0;
			String s = "";
			while (dec > 0)
			{
				temp = dec % base;
				if (temp <= 9)
				{
					temp += 48;
					s = (char)temp + s;
	 			}
				else if (temp >= 10 && temp <= 23) 
				{
					temp += 55;
					s = (char)temp + s;
				}
				dec /= base;
			}
			based += s;
		}
		return based;
	}
}