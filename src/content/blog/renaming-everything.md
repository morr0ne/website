---
title: 'Renaming all my projects and digital footprint'
description: 'A small post describing how I renamed all my digital presence from simple
changes to resigning all my commits with a new GPG key'
pubDate: '2025-02-23'
---

Recently I decided I had enough of seeing my deadname appearing everywhere I
looked: it was in my personal projects, my orgs, even my published crates and
AUR packages. So I made the choice of renaming all my stuff. In the end, this
was actually more painful than I thought, and I mean literally; after hours of
typing away at my laptop, my fingers and arms were hurting. I'm writing this
mostly to document what I actually had to do, and I'm hoping this guide can be
useful if anyone ever needs to do something similar, but I hope y'all don't have
to suffer through 5-year-old untouched repos.

First off, the easy stuff: renaming the accounts. This was quite easy since
GitHub doesn't really care about verifying your identity. The _edit profile_
button was all I needed, and boom: no more deadname.

Connected accounts like crates.io simply updated on my next login. I had to
rename my freedesktop GitLab account in a similar fashion, but that was quite
easy.

Now for the harder stuff.

First of all, I decided to just go into my projects folders and do a grep just
to get a feel for things. That was a mistake. After running the following quite
innocuous command:

```bash
grep -ri "<deadname>" . | wc -l
```

I quickly realized I made a mistake. After more than 30 minutes it was still
hanging there, so I decided that that wouldn't work. Instead, I moved all my
projects to a separate folder and started renaming files in them one by one.
After replacing my name from a bunch of Cargo.toml files and pushing them, I
realized I missed a crucial step: my git config, ouch. My git user was still
using my deadname and my GPG identity was linked to it. That's not good. After
debating what to do for a while, I decided I would create a new GPG key and
simply rewrite the git history of all my repos... Yeah, maybe not my smartest
move, but I was determined to change everything.

Creating a new key was as easy as:

```bash
gpg --full-generate-key
```

And just accepting the defaults, which are probably good enough. I gave it my
new name, and now I have a new GPG key. I added it to my GitHub and deleted my
old one. Now it was time to actually rewrite the history. This actually took
hours of googling and asking Claude for help, but in the end, I ended up with
the following script that I saved as resign.sh:

```bash
#!/bin/bash
set -euxo pipefail # Make sure we fail early

OLD_NAME="..."
OLD_EMAIL="..."
NEW_NAME="Matilde Morrone"
NEW_EMAIL="contact@morrone.dev"

# Save the original remote since we lose it after running the filtering
ORIGINAL_ORIGIN=$(git remote get-url origin)

# Use filter-repo to change the author and committer while preserving dates
git filter-repo --force \
    --name-callback "return b'$NEW_NAME' if name == b'$OLD_NAME' else name" \
    --email-callback "return b'$NEW_EMAIL' if email == b'$OLD_EMAIL' else email" \
    --message-callback "return message.replace(b'$OLD_NAME', b'$NEW_NAME')"

# Remove signatures while preserving dates
git filter-repo --force \
    --commit-callback '
        commit.gpgsig = None
        return commit
    '

# Re-sign each commit while preserving original dates
git rebase --exec 'GIT_COMMITTER_DATE="$(git log -1 --format=%aD)" git commit --amend --no-edit -S --date="$(git log -1 --format=%aD)"' --root

# Add back the origin
git remote add origin $ORIGINAL_ORIGIN

# Push it
git push --set-upstream origin main --force
```

This script makes a few assumptions: first, that you have configured your new
GPG key as the signing key; secondly, that your main branch is actually named
main.

The first one is easy, but the second one was actually not always true. Some of
my repos hadn't been updated in almost 6 years, so they were still using master.
No problem though; a quick:

```bash
git checkout -b main && git push --set-upstream origin main
```

And it's fixed. Sure, I then have to delete the master branch and then tell
GitHub to use main, but that's not the point.

Then it became an exercise in not going insane doing the following:

```bash
cp ~/unrenamed-projects/<project-name> . # or git clone for old projects
grep -ri <deadname> . # check for my deadname
code .  # open in vscode to change it
~/projects/resign.sh # make sure to resign
```

Of course, from time to time there was some manual intervention needed, but
nothing too bad. While simple in theory, this took hours of work, but in my
opinion, it's definitely worth it.

After this, I updated the website you are reading, went through my AUR packages,
replaced my name, and I also reopened a couple of PRs/MRs that still had my old
name and GPG key.

I probably missed a few spots, but I am quite content with where I am: no longer
seeing someone else's name taking credit for my stuff.

If you are following this as a guide, then please read the scripts carefully
before copying and pasting them. Besides that, I think this is quite a nice
first blog post. I hope this is useful to someone or that at least you had fun
reading!
