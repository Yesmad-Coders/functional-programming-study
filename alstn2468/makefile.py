from datetime import date
import sys
import os
import errno


def main():
    folderDate = date.today().strftime("%Y-%m-%d")
    if len(sys.argv) != 1:
        folderDate = sys.argv[1]
    filename = f"./{folderDate}/README.md"
    if not os.path.exists(os.path.dirname(filename)):
        try:
            os.makedirs(os.path.dirname(filename))
        except OSError as exc:
            if exc.errno != errno.EEXIST:
                raise
    with open(filename, "w") as f:
        f.write(f"# {folderDate}")


main()
