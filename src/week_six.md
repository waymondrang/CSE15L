# SSHorten SSH

<div class="label">Week 6 Lab Report</div>

This document will walk you through creating an SSH configuration file to streamline the usage of `ssh`.

Instead of typing out the entire `user@ieng6.ucsd.edu` to login, we'll be able to use an alias, such as `ucsd`, to simplify the `ssh` command.

What you're (probably) currently doing (typing out the whole address)

![original ssh](https://i.imgur.com/GEnK2Um.png)

What you'll be doing after this guide (typing in an alias)

![streamlined ssh](https://i.imgur.com/G3zC4la.png)

## No More Emails

Ok, it isn't *really* an email address. The `user@host` format is used to tell the computer which account to access at the host address. Let's set up our `ssh` config file so that we won't have to type it out every time we run `ssh`.

We want to create a file called `config` with *no* extension (yes, just config) in the `.ssh` directory on our local computer. For Mac devices, you'll create/find the `config` file at `~/.ssh/config`. For Windows, you'll create/find the `config` file in the `.ssh` directory of your system user directory. 

For example, my `.ssh` directory is at

```
 C:\Users\raymond\.ssh>
 ```

If you're using the terminal to navigate to this directory, you can open it in Windows Explorer by typing `explorer .`.

If no config file exists, open the folder in Visual Studio Code and create a `config` file with no extension. If a config file already exists, you can edit it within a text editor, such as notepad.

Within the config file, paste in these lines, changing each field appropriately.

```
Host ALIAS
    HostName ieng6.ucsd.edu
    User USERNAME
```

Change `ALIAS` to anything rememberable, such as `ieng6` or `ucsd`. Change `USERNAME` to your username from your "email address".

For example, my config file looks like this.

![config file](https://i.imgur.com/mmUnYGf.png)

The IdentityFile field just specifies which rsa key to use as I have multiple keys.

After editing your `config` file, save it. Then, head to the terminal and try using `ssh YOUR_ALIAS`. 

If you successfully followed all the steps, you should've accessed your `ieng6` account. Your terminal should look something like this

![streamlined ssh](https://i.imgur.com/G3zC4la.png)

Congratulations! Now you can run `ssh` with up to 620% less keystrokes.

## Demonstration with `scp`

You'll be able to use your alias in commands such as `scp`, which is a huge time saver. Here, I use the alias to copy this report's Markdown file to my `ieng6` account.

![scp with alias](https://i.imgur.com/r7hdhzF.png)