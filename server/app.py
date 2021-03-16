import os
import jwt
import bcrypt
import datetime
import mysql.connector
from flask import Flask, request, jsonify
from slugify import slugify

# Constants
BASE_URL = "/api/v1"

# Globally scoped variables
app = Flask(__name__)

# Helper functions
def get_db():
  db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="BetterMoodle",
    buffered=True
  )

  return db

def note_to_json(note):
  if note != None:
    if len(note) >= 9:
      json = {}
      json['id'] = note[0]
      json['title'] = note[1]
      json['slug'] = note[2]
      json['description'] = note[3]
      json['body'] = note[4]
      json['moduleId'] = note[5]
      json['isPublic'] = note[6]
      json['createdAt'] = note[7]
      json['published'] = note[8]

      return json


def module_to_json(module):
  if module != None:
    if len(module) >= 4:
      json = {}
      json['id'] = module[0]
      json['title'] = module[1]
      json['slug'] = module[2]
      json['description'] = module[3]

      return json 


def lesson_to_json(lesson):
  if lesson != None:
    if len(lesson) >= 9:
      json = {}
      json['id'] = module[0]
      json['moduleId'] = module[1]
      json['slug'] = module[2]
      json['author'] = module[3]
      json['title'] = module[4]
      json['description'] = module[5]
      json['body'] = module[6]
      json['createdAt'] = module[7]
      json['published'] = module[8]

      return json


def institution_to_json(institution):
  if institution != None:
    if len(institution) >= 2:
      json = {}
      json['id'] = institution[0]
      json['name'] = institution[1]

      return json


def event_to_json(event):
  if event != None:
    if len(event) >= 6:
      json = {}
      json['id'] = event[0]
      json['title'] = event[1]
      json['date'] = event[2]
      json['start'] = event[3]
      json['end'] = event[4]
      json['description'] = event[5]

      return json


def user_to_json(user):
  if user != None:
    if len(user) >= 7:
      json = {}
      json['id'] = user[0]
      json['username'] = user[1]
      json['firstName'] = user[2]
      json['lastName'] = user[3]
      json['institutionId'] = user[4]
      json['privilege'] = user[5]
      json['hash'] = user[6]

      return json


def get_user(username):
  """ Return all fields from user, given their username """

  query = """ SELECT * FROM user WHERE username = '{}' """.format(username)
  db = get_db()
  cursor = db.cursor()
  cursor.execute(query)
  result = cursor.fetchone()
  cursor.close()
  db.close()

  return user_to_json(result)


def create_user(username, password, first_name, last_name, institution_id, privilege):
  """ 
    Insert a user into the users table, generating a hash and salt from the
    provided password. 
  """ 

  password = password.encode("utf-8")
  hash_and_salt = bcrypt.hashpw(password, bcrypt.gensalt())
  hash_and_salt = hash_and_salt.decode("utf-8")

  query = """
    INSERT INTO user (UserName, FName, LName, InstitutionID, Privilege, Hash)
    VALUES (%s, %s, %s, %s, %s, %s);
  """

  db = get_db()
  cursor = db.cursor()
  cursor.execute(query, (username, first_name, last_name, institution_id, privilege, hash_and_salt))
  db.commit()
  cursor.close()
  db.close()


"""
---------------------------------------------
-------------- MODULES ROUTES ---------------
---------------------------------------------

"""

@app.route(BASE_URL + '/modules/all', methods=['GET'])
def get_all_modules():
  """ 
    Return all modules in their json form. Note: a more correct implementation
    would use the requester's UserID, and fetch their modules from the modules 
    table through the UserModule bridging table. 
  """

  query = "SELECT * FROM module;"
  db = get_db()
  cursor = db.cursor()
  cursor.execute(query)
  results = cursor.fetchall()
  results = [module_to_json(module) for module in results]
  cursor.close()
  db.close()

  return jsonify(results)


@app.route(BASE_URL + '/modules/new', methods=['POST'])
def new_module():
  """ Create a new module. """

  name = request.form['name']
  description = request.form['description']
  slug = slugify(name)

  query = """
    INSERT INTO module (ModuleID, Name, Description, Slug)
    VALUES (UUID(), %s, %s, %s);
  """

  db = get_db()
  cursor = db.cursor()
  cursor.execute(query, (name, description, slug,))
  db.commit()
  cursor.close()
  db.close()

  return jsonify({ 'code': 200 })


@app.route(BASE_URL + '/modules/edit', methods=['POST'])
def edit_module():
  """ 
    Edit the name and description fields of a module given those
    new values and the ModuleID.
  """

  moduleId = request.form['id']
  name = request.form['name']
  description = request.form['description']

  slug = slugify(name)

  sql = """
    UPDATE module
    SET Name = %s, Description = %s, Slug = %s
    WHERE ModuleID = %s;
  """

  db = get_db()
  cursor = db.cursor()
  cursor.execute(sql, (name, description, slug, moduleId,))
  db.commit()
  cursor.close()
  db.close()

  return jsonify({ 'code': 200 })


@app.route(BASE_URL + '/modules/delete/<moduleId>', methods=['GET'])
def delete_module(moduleId):
  """
    Delete a module given its ModuleID. Note: this is currently done
    through a get request as Flask HTTP DELETE methods are unstable.
  """

  query = "DELETE FROM module WHERE ModuleID = %s;"
  db = get_db()
  cursor = db.cursor()
  cursor.execute(query, (moduleId,))
  db.commit()
  cursor.close()
  db.close()

  return jsonify({ 'code': 200 })


@app.route(BASE_URL + '/modules/<slug>', methods=['GET'])
def get_module(slug):
  """
    Return the json representation of module given its slug (human-
    readable URL).
  """

  query = "SELECT * FROM module WHERE Slug = %s;"
  db = get_db()
  cursor = db.cursor()
  cursor.execute(query, (slug,))
  result = cursor.fetchone()
  cursor.close()
  db.close()

  return jsonify(module_to_json(result))


"""
-------------------------------------------
-------------- NOTES ROUTES ---------------
-------------------------------------------

"""

@app.route(BASE_URL + '/notes/all', methods=['GET'])
def all_notes():
  """
    Return all notes. Note: ideally this function would use the
    UserID of the requester to find modules they take and then select
    notes which belong to this set of modules.
  """

  query = "SELECT * FROM note;"
  db = get_db()
  cursor = db.cursor()
  cursor.execute(query)
  results = cursor.fetchall()
  cursor.close()
  db.close()

  return jsonify([note_to_json(note) for note in results])


@app.route(BASE_URL + '/notes/new', methods=['POST'])
def create_note():
  """
    Create a new note. Note: the current implementation does not use the
    UserID of the requester, and always sets the viewing permissions of the
    note to public.
  """

  title = request.form['title']
  moduleId = request.form['moduleId']
  description = request.form['description']
  body = request.form['body']
  slug = slugify(title)

  query = """
    INSERT INTO note (Title, Slug, Description, Body, ModuleID, IsPublic, CreatedAt, Published, UserID)
    VALUES (%s, %s, %s, %s, %s, TRUE, CURDATE(), CURDATE(), 0);
  """

  db = get_db()
  cursor = db.cursor()
  cursor.execute(query, (title, slug, description, body, moduleId))
  db.commit()
  cursor.close()
  db.close()

  return jsonify({ 'code': 200 })


@app.route(BASE_URL + '/notes/edit', methods=['POST'])
def edit_note():
  """
    Allows the editing of a note. Updating the title will re-generate the note slug. 
  """

  noteId = request.form['id']
  moduleId = request.form['moduleId']
  title = request.form['title']
  description = request.form['description']
  body = request.form['body']
  slug = slugify(title)

  sql = """
    UPDATE note
    SET ModuleID = %s, Title = %s, Description = %s, Body = %s, Slug = %s
    WHERE NoteID = %s;
  """

  db = get_db()
  cursor = db.cursor()
  cursor.execute(sql, (moduleId, title, description, body, slug, noteId))
  db.commit()
  cursor.close()
  db.close()

  return jsonify({ 'code': 200 })


@app.route(BASE_URL + '/notes/delete/<noteId>', methods=['GET'])
def delete_note(noteId):
  """ Deletes a note which matches the provided note ID. """

  query = "DELETE FROM note WHERE NoteID = %s;"
  db = get_db()
  cursor = db.cursor()
  cursor.execute(query, (noteId,))
  db.commit()
  cursor.close()
  db.close()

  return jsonify({ 'code': 200 })


@app.route(BASE_URL + '/notes/<slug>', methods=['GET'])
def get_note(slug):
  """ Returns the json of a note, given its slug """

  query = "SELECT * FROM note WHERE Slug = %s;"
  db = get_db()
  cursor = db.cursor()
  cursor.execute(query, (slug,))
  result = cursor.fetchone()
  cursor.close()
  db.close()

  return jsonify(note_to_json(result))


"""
---------------------------------------------
-------------- LESSONS ROUTES ---------------
---------------------------------------------

"""

@app.route(BASE_URL + '/lessons/<moduleId>', methods=['GET'])
def get_lessons(moduleId):
  """ Return all lessons, in their json format, that match the ModuleID. """

  query = "SELECT * FROM lesson WHERE ModuleID = %s;"
  db = get_db()
  cursor = db.cursor()
  cursor.execute(query, (moduleId,))
  results = cursor.fetchall()
  results = [lesson_to_json(lesson) for lesson in results]
  cursor.close()
  db.close()

  return jsonify(results)


@app.route(BASE_URL + '/lessons/edit', methods=['POST'])  
def edit_lesson():
  """ Edit the lesson contents given its id. """

  lessonId = request.form['id']
  title = request.form['title']
  description = request.form['description']
  body = request.form['body']
  slug = slugify(title)

  query = """
    UPDATE lesson
    SET Title = %s, Description = %s, Body = %s, Slug = %s
    WHERE LessonID = %s;
  """

  db = get_db()
  cursor = db.cursor()
  cursor.execute(query, (title, description, body, slug, lessonId,))
  db.commit()
  cursor.close()
  db.close()

  return jsonify({ 'code': 200 })


@app.route(BASE_URL + '/lessons/delete/<lessonId>', methods=['GET'])  
def delete_lesson(lessonId):
  """ Delete a lesson given its lessonId """

  query = "DELETE FROM lesson WHERE LessonID = %s;"
  db = get_db()
  cursor = db.cursor()
  cursor.execute(query, (lessonId,))
  db.commit()
  cursor.close()
  db.close()

  return jsonify({ 'code': 200 })


"""

--------------------------------------------
-------------- EVENTS ROUTES ---------------
--------------------------------------------

"""

@app.route(BASE_URL + '/events/all', methods=['GET'])  
def get_all_events():
  """ 
    Return all events. Ideally this function returns all events which include
    their UserID as a listener in the UserEvent bridging table.
  """

  db = get_db()
  query = "SELECT * FROM event"
  cursor = db.cursor()
  cursor.execute(query)
  results = cursor.fetchall()
  cursor.close()
  db.close()

  return jsonify([event_to_json(event) for event in results])


@app.route(BASE_URL + '/events/new', methods=['POST'])  
def new_event():
  """
    Inserts a new event at the provided date, between the start and end dates.
    Ideally we would insert the event and ensure the requester's UserID is marked
    as a listener of this event in the UserEvent bridging table.
  """

  title = request.form['title']
  date = request.form['date']
  start = request.form['start']
  end = request.form['end']
  token = request.form['token']
  description = request.form['description']
  user = jwt.decode(token, "secret", algorithms="HS256")
  
  if user != None:
    if user['userId'] != None:
      query = """
        INSERT INTO event (Title, Date, Start, End, Description)
        VALUES (%s, %s, %s, %s, %s);
      """

      db = get_db()
      cursor = db.cursor()
      cursor.execute(query, (title, date, start, end, description,))
      db.commit()
      cursor.close()
      db.close()

      return jsonify({ 'code': 200 })

    else:
      return jsonify({ 'code': 404 }) # could not find user
  else:
    return jsonify({ 'code': 403 }) # user does not have permission


@app.route(BASE_URL + '/events/edit', methods=['POST'])  
def edit_event():
  """ Update the contents of an event. """

  eventId = request.form['id']
  title = request.form['title']
  date = request.form['date']
  start = request.form['start'] 
  end = request.form['end']
  description = request.form['description']

  query = """
    UPDATE event
    SET Title = %s, Description = %s, Date = %s, Start = %s, End = %s
    WHERE EventID = %s;
  """ 

  db = get_db()
  cursor = db.cursor()
  cursor.execute(query, (title, description, date, start, end, eventId,))
  db.commit()
  cursor.close()
  db.close()

  return jsonify({ 'code': 200 })


@app.route(BASE_URL + '/events/delete/<eventId>', methods=['GET'])  
def delete_event(eventId):
  """ 
    Delete the event matching the EventID. Ideally this would also purge the
    UserEvent bridging table of all event listeners. 
  """

  query = "DEELTE FROM event WHERE eventId = %s"
  db = get_db()
  cursor = db.cursor()
  cursor.execute(query, (eventId,))
  db.commit()
  cursor.close()
  db.close()

  return jsonify({ 'code': 200 })


"""

-------------------------------------------------
-------------- INSTITUTION ROUTES ---------------
-------------------------------------------------

"""

@app.route(BASE_URL + '/institutions/all', methods=['GET'])
def get_all_institutions():
  """ Return the json representation of all the institutions """

  query = "SELECT * FROM institution;"
  db = get_db()
  cursor = db.cursor()
  cursor.execute(query)
  results = cursor.fetchall()
  cursor.close()
  db.close()

  return jsonify([institution_to_json(institution) for institution in results])


"""

------------------------------------------
-------------- USER ROUTES ---------------
------------------------------------------

"""

@app.route(BASE_URL + '/users/<username>', methods=['GET'])
def get_user_by_username(username):
  return jsonify(get_user(username))


@app.route(BASE_URL + '/signin', methods=['POST'])
def signin():
  """ 
    Sign the user in by retrieving the user with the matching username from
    the form body. If this user exists, compare the password they supplied with
    the stored hash. If the password is correct, encode the user object into a
    token and send this to the client. All future requests that are permissioned
    will decode this token to retrieve the user object.
  """

  username = request.form['username']
  password = request.form['password']
  user = get_user(username)

  if user != None:
    if bcrypt.checkpw(password.encode("utf-8"), user['hash'].encode("utf-8")):
      userObject = {}
      userObject["userId"] = user["id"]
      userObject["privilege"] = user["privilege"]
      token = jwt.encode(userObject, "secret", algorithm="HS256")
      return jsonify({ "validSignIn": True, "token": token })
    else:
      return jsonify({ "validSignIn": False, "error": "Invalid password." })
  else:
    return jsonify({ "validSignIn": False, "error": "Could not find user." })


@app.route(BASE_URL + '/signup', methods=['POST'])
def signup():
  username = request.form['username']
  password1 = request.form['password1']
  password2 = request.form['password2']
  first_name = request.form['firstName']
  last_name = request.form['lastName']
  institutionId = request.form['institution']
  privilege = request.form['privilege']

  if password1 == password2:
    user = get_user(username)
    if user == None:
      create_user(username, password1, first_name, last_name, institutionId, privilege)
      return jsonify(True)
    else:
      return jsonify({ "error": "User already exists." })
  else:
    return jsonify({ "error": "Passwords do not match." })

if __name__ == '__main__':
  app.run(port = 8080)