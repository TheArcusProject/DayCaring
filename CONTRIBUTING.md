# Contributing

Workflow when starting to work on a new feature:

1. git checkout -b (new branch name)
2. git fetch origin master
3. git rebase origin/master
4. code
5. git add (filename) (please do not git add .)
6. git commit -m 'your message'
7. git push origin (your branch name)
8. Look for merge conflicts
9. If conflict - git fetch origin master
10.            - git rebase origin/master
11.            - resolve merge conflicts
12. add, commit and push again

Delete the branch after you pull a request.

What to do when your local is irredeemably borked:

git fetch origin master

git reset --hard origin/master
