# Dear Incoming CSE 15L Students

<div class="label">Week 2 Lab Report</div>

This document will serve as an introductory guide to CSE 15L, teaching everything you need to know for the first week of class.

## Installing Visual Studio Code

Visual Studio Code is your go-to text editor. It's fast, reliable, and ice to look at.

To install it, visit [their website](https://code.visualstudio.com/) and follow the instructions to download and install it. If your operating system is not compatible, you could try to use their [online editor](https://vscode.dev/). However, we will be using the terminal in the next steps which is unavailable in the online editor.

Once it has installed, open it and you should be presented with a window similar to the one below. Your window may have slightly different colors or designs—Visual Studio Code has different themes you can play with!

![New Visual Studio Code Window](visualstudiocode.png)

## Getting Connected

Before you connect to your CSE course-specific account, you'll need to do several steps. If you are using Windows, verify you have OpenSSH. If you can run `ssh` in your terminal, then you already have SSH installed on your system. You can learn how to install OpenSSH [here](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse).

After you can use the `ssh` command, look up your CSE 15L specific UCSD account [here](https://sdacs.ucsd.edu/~icc/index.php). You may need to change your password to access your course-specific accounts.

Now, we do the fun stuff. In Visual Studio Code, open a new terminal window by using the shortcut ``CTRL + SHIFT + ` `` or by navigating to the **Terminal** tab in the menu and selecting **New Terminal**.

In the terminal, type `ssh` and then `USERNAME@ieng6.ucsd.edu`. For example,

```
ssh cs15lwi22abc@ieng6.ucsd.edu
```

You may be prompted with the following question. Type `yes` to continue.

```
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

After that, you will be prompted to enter in your password, after which you will see output that looks similar to this.

![Successful SSH Connection](ssh.png)

If you see this message, that means you have successfully connected to a computer in the CSE basement. Now, any commands that you run in the terminal will execute remotely on the connected computer.

## Executing Commands

Now that were connected to our remote computer like Neo to the Matrix, play around with the following commands

| Command | Description                             |
| ------- | --------------------------------------- |
| `cd`    | change the working directory            |
| `ls`    | list directory contents                 |
| `pwd`   | print name of current/working directory |
| `mkdir` | make directories                        |
| `cp`    | copy files and directories              |

Below is an example of the commands being run. Notice the different colors of each item in the output of `ls`. Each color represents a different type of item. For example, items in blue represent folders. 

![Successful SSH Connection](commands.png)

In addition, there are options you can add with each command. For example, a standard `ls` command would output something like this.

![Standard ls Command](ls.png)

However, if we add the `-a` option to the command, ls will not ignore entries that start with `.`, like such

![ls -a Command](ls-a.png)

That's a lot of hidden items!

## Teleporting Files

Now you'll learn a magic trick that's sure to amaze. `scp` is the command that will teleport files from your computer to your remote computer in the CSE basement (or from the remote computer to your local computer). Lets try it out.

In your Visual Studio Code window, create a text file and name it whatever you please. Type and save anything into the file, and run the following command in the terminal.

```
scp FILENAME.txt USERNAME@ieng6.ucsd.edu:~/
```

For example,

![ls -a Command](dog.png)

Then, access the remote computer via SSH and check for your file using `ls`. To open the text file, run

``` 
nano FILENAME.txt
```

To exit the editor, press `CTRL + X`.

Your terminal output should look something like this.

![ls -a Command](sshdog.png)

![ls -a Command](sshdognano.png)

## Becoming a Keymaker

In the Matrix, the Keymaker was a program created to provide access to programming hallways and open doors. Similar to the Keymaker, the `ssh-keygen` command generates a *public* and *private* key pair. After copying the *public* key onto the SSH server, connections between the client and server would no longer require a password.

To get started, run the `ssh-keygen` command on your *local* computer. By default, the `ssh-keygen` command will generate a public and private RSA key pair.

RSA is a type of key system that is widely used, and we can specify which type of key system we want by using the `-t` option. Because the command defaults to RSA, running `ssh-keygen -t rsa` would be no different than the original command. 

Save the key in the default location and leave the passphrase empty. Your output should look similar to this screenshot.

![ls -a Command](sshkeygen.png)

After this, use `scp` to teleport the `id_rsa.pub` file from your local computer to the `~/.ssh/authorized_keys` location of the remote SSH server. Use the output from `ssh-keygen` to locate the public key file's location. The scp command would follow this template

```
scp /PATH/TO/PUBLIC/KEY/id_rsa.pub USERNAME@ieng6.ucsd.edu:~/.ssh/authorized_keys
```

After successfully copying over your public key, you should now be able to perform `ssh` without being prompted for a password.

## Optimizing and Optimizing

Now that running `ssh` is more convenient, you can easily run commands on the remote server using a single command. Commands in quotes appended at the end of an `ssh` command will execute after logging in.

For example, running `ssh` with `cd projects;ls` would login, navigate to the projects folder, and list the items within the folder. Using `;`, you can run multiple commands sequentially.

Another example of an useful one-liner is with `javac` and `java`. By running `javac` and then `java` on the remote computer, you can remotely compile and execute Java code.

I combined `ssh` and `scp` to create a one-liner command that creates a folder, copies the Java file into the folder, and then remotely compiles and executes the Java file.

![Remote Java Execution One-Liner](javac.png)

