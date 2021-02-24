from datetime import date
import sys
import os
import errno


def main():
    try:
        folder_date = date.today().strftime("%Y-%m-%d")
        if len(sys.argv) != 1:
            username = sys.argv[1]
        else:
            raise Exception(
                "ERROR: 예외 발생\n"
                + "makefile.py 파일의 첫번째 인자는 사용자 이름입니다.\n"
                + "ex) python makefile.py <username> <folder_date:선택>\n"
                + "\n"
                + "위의 명령어를 사용하면 아래의 경로에 파일이 생성됩니다.\n"
                + ">>> username/folder_date/README.md <<<\n"
                + "\n"
                + "folder_date 인자는 선택입니다.\n"
                + "인자가 전달되지 않을 경우 %Y-%m-%d 포맷의 현재 날짜 폴더가 생성됩니다."
            )
        if len(sys.argv) > 2:
            folder_date = sys.argv[2]
        filename = f"./{username}/{folder_date}/README.md"
        if not os.path.exists(os.path.dirname(filename)):
            os.makedirs(os.path.dirname(filename))
        with open(filename, "w") as f:
            f.write(f"# {folder_date}")
    except OSError as exc:
        if exc.errno != errno.EEXIST:
            raise
    except Exception as e:
        print(e)


main()
