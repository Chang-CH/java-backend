import modules.rune.Rune;

class Task1 implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            Main.rune = Rune.beside(Main.rune, Rune.green(Rune.circle));
            try {
                Thread.sleep(300);
            } catch (Exception e) {
                System.out.println("interrupt");
            }
        }
    }
}

class Task2 implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            Main.rune = Rune.stack(Main.rune, Rune.blue(Rune.corner));
            try {
                Thread.sleep(500);
            } catch (Exception e) {
                System.out.println("interrupt");
            }
        }
    }
}

public class Main {
    static Rune rune = Rune.red(Rune.heart);
    
    public static void main(String[] args) {
        // Create instances of the tasks
        Task1 task1 = new Task1();
        Task2 task2 = new Task2();
        
        Thread thread1 = new Thread(task1);
        Thread thread2 = new Thread(task2);
        
        thread1.start();
        thread2.start();
        try {
            thread1.join();
            thread2.join();
        } catch(Exception e) {
            System.out.println("interrupted");
        }
        Rune.show(Main.rune);
    }
}
