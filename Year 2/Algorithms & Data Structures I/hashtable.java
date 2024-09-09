public class HashTable {

	private String[] hashTable;
	private long total = 0;
    public HashTable(String[] input)
    {
        hashTable = input;
	}
    public boolean check(int slot, String check)
    {
        if (hashTable[slot].equals(check)) return true;
        else {
        	total++;
        	//System.out.println(slot + " " + check);
            return false;
        }
    }
    public long gettotal()
    {
        return total;
    } 
}