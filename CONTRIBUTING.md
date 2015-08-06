# Contributing

Workflow when starting to work on a new feature:

1. git checkout -b (new branch name)
2. git fetch origin master
3. git rebase origin/master
4. code
5. git add (filename) (please do not git add .)
6. git commit -m 'your message'
7. git fetch origin master
8. git rebase origin/master
    fix merge conflicts
    git rebase --continue
9. git push origin (your branch name)

Delete the branch after you pull a request.