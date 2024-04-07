import { exec } from "child_process";
import express from "express";
import fs from "fs";

const router = express.Router();

function cf2b64(path: string): string {
  const buffer = fs.readFileSync(path, null);
  return buffer.toString("base64");
}

/* GET users listing. */
router.post("/", function (req: any, res: any, next: any) {
  console.log(req.body);
  exec(`del compile\\*.class`);
  fs.writeFileSync("compile/Main.java", req.body);
  exec(
    `cd compile && javac *.java -target 8 -source 8`,
    (err: any, stdout: string, stderr: string) => {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);

      if (stderr && stderr.includes("error")) {
        res.status(500).send({ error: stderr });
      } else {
        let files: { [key: string]: string } = {};

        fs.readdirSync("./compile").forEach((filename) => {
          if (filename.endsWith(".class")) {
            files[filename] = cf2b64("compile/" + filename);
          }
        });

        res.send(files);
      }
    }
  );
});

export default router;
