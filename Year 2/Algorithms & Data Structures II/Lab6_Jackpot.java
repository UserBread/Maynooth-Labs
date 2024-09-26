//TODO: allow for any combination of the winning ticket to be accepted
public class Lab6_Jackpot 
{
    public static void main(String [] args) 
    {
        int jackpot = 130000000;
        int ntickets = 100000;
        double winnings = 0;
        double ticketprice = 5 * ntickets;

        //Populate winning arrays
        int [] winningNums = new int[5];
        int [] winningStars = new int[2];
        for (int i = 0; i < winningNums.length + winningStars.length; i++) {
            int num = (int)(Math.random()*100 + 1);
            if (i > 4) {
                winningStars[i%5] = num;
            }
            else {
                winningNums[i] = num;
            }
        }

        int [] ticketNums = new int[5];
        int [] ticketStars = new int[2];
        for (int i = 0; i < ntickets; i++) {
            int numMatch = 0;
            int starMatch = 0;

            //Populate tickets arrays
            for (int j = 0; j < ticketNums.length + ticketStars.length; j++) {
                int num = (int)(Math.random()*100 + 1);
                if (j > 4) {
                    ticketStars[j%5] = num;
                }
                else {
                    ticketNums[j] = num;
                }
            }

            //Check for match
            for (int j = 0; j < winningNums.length; j++) {
                if (winningNums[j] == ticketNums[j]) numMatch++;
            }
            for (int j = 0; j < winningStars.length; j++) {
                if (winningStars[j] == ticketStars[j]) starMatch++;
            }

            //Check amount won based on matches
            if (numMatch == 2) winnings += 5;
            else if (numMatch == 2 && starMatch == 1) winnings += 6;
            else if (numMatch == 1 && starMatch == 2) winnings += 7;
            else if (numMatch == 3) winnings += 12;
            else if (numMatch == 3 && starMatch == 1) winnings += 13;
            else if (numMatch == 2 && starMatch == 2) winnings += 16;
            else if (numMatch == 4) winnings += 55;
            else if (numMatch == 3 && starMatch == 2) winnings += 65;
            else if (numMatch == 4 && starMatch == 1) winnings += 161;
            else if (numMatch == 4 && starMatch == 2) winnings += 1954;
            else if (numMatch == 5) winnings += 26803;
            else if (numMatch == 5 && starMatch == 1) winnings += 420495;
            else if (numMatch == 5 && starMatch == 2) winnings += jackpot;
        }
        System.out.println("Euro:" + winnings);
        System.out.println(((double) (winnings / ticketprice) * 100) + "%");
    }
}
