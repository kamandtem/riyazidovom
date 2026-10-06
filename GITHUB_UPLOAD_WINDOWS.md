# بارگذاری پروژه در GitHub و ساخت APK

این پروژه برای GitHub Actions آماده است و پوشهٔ `android` عمداً در مخزن نیست؛ اکشن آن را خودش می‌سازد.

در CMD، داخل همین پوشه اجرا کن:

```cmd
git init
git branch -M main
git add .
git commit -m "Prepare Grade 2 math app"
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

به‌جای `USERNAME/REPOSITORY` آدرس مخزن خودت را بگذار.

بعد در GitHub به تب **Actions** برو، workflow با نام **Build Android APK** را باز کن، روی **Run workflow** بزن و بعد از سبز شدن اجرا، فایل را از بخش **Artifacts** دانلود کن.

فایل دانلودشده ZIP است؛ آن را استخراج کن تا به `app-debug.apk` برسی.

اگر در مرحلهٔ `actions/setup-node@v4` پیام `Dependencies lock file is not found` دیدی، نسخهٔ فعلی workflow این مشکل را ندارد؛ چون کش npm را به lockfile وابسته نکرده است.
